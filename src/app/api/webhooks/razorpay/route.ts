import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";

/**
 * POST /api/webhooks/razorpay
 *
 * Razorpay webhook handler — processes payment events server-to-server.
 * This is the CRITICAL safety net: if the user's browser closes before
 * the client-side /api/payment/verify call completes, this webhook
 * still upgrades the user's plan.
 *
 * Setup in Razorpay Dashboard → Settings → Webhooks:
 *   URL:    https://yourdomain.com/api/webhooks/razorpay
 *   Secret: (set RAZORPAY_WEBHOOK_SECRET in .env)
 *   Events: payment.captured, payment.failed, order.paid
 */

// Disable Next.js body parsing — we need the raw body for signature verification
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const webhookSignature = req.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // If webhook secret is not configured, log and accept (for development)
    if (!webhookSecret) {
      console.warn("[WEBHOOK] RAZORPAY_WEBHOOK_SECRET not configured — skipping signature verification");
      // In production, you should reject unsigned webhooks:
      // return NextResponse.json({ message: "Webhook secret not configured" }, { status: 500 });
    }

    // Verify webhook signature if secret is configured
    if (webhookSecret && webhookSignature) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      const isValid = crypto.timingSafeEqual(
        Buffer.from(expectedSignature, "hex"),
        Buffer.from(webhookSignature, "hex")
      );

      if (!isValid) {
        console.error("[WEBHOOK] Invalid signature — rejecting");
        return NextResponse.json({ message: "Invalid webhook signature" }, { status: 400 });
      }
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event as string;

    console.log("[WEBHOOK] Received event:", eventType);

    switch (eventType) {
      case "payment.captured":
      case "order.paid": {
        const payment = event.payload?.payment?.entity;
        if (!payment) {
          console.error("[WEBHOOK] No payment entity in event payload");
          return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
        }

        const orderId = payment.order_id as string;
        const paymentId = payment.id as string;

        if (!orderId) {
          console.error("[WEBHOOK] Missing order_id in payment entity");
          return NextResponse.json({ message: "Missing order_id" }, { status: 400 });
        }

        // Find the payment record
        const paymentRecord = await prisma.payment.findUnique({
          where: { orderId },
        });

        if (!paymentRecord) {
          console.warn("[WEBHOOK] No payment record found for order:", orderId);
          // Return 200 to prevent Razorpay from retrying — this order isn't ours
          return NextResponse.json({ message: "Order not found, ignoring" });
        }

        // Idempotency: skip if already completed
        if (paymentRecord.status === "completed") {
          console.log("[WEBHOOK] Payment already completed, skipping:", orderId);
          return NextResponse.json({ message: "Already processed" });
        }

        // Upgrade user plan + update payment record atomically
        await prisma.$transaction([
          prisma.user.update({
            where: { id: paymentRecord.userId },
            data: { plan: "pro" },
          }),
          prisma.payment.update({
            where: { orderId },
            data: {
              status: "completed",
              paymentId: paymentId,
            },
          }),
        ]);

        console.log("[WEBHOOK] User upgraded via webhook:", paymentRecord.userId, "Order:", orderId);
        return NextResponse.json({ message: "Payment processed successfully" });
      }

      case "payment.failed": {
        const payment = event.payload?.payment?.entity;
        const orderId = payment?.order_id as string;

        if (orderId) {
          const paymentRecord = await prisma.payment.findUnique({
            where: { orderId },
          });

          // Only mark as failed if it hasn't already been completed
          // (edge case: webhook arrives after client-side verify already succeeded)
          if (paymentRecord && paymentRecord.status !== "completed") {
            await prisma.payment.update({
              where: { orderId },
              data: { status: "failed" },
            });
            console.log("[WEBHOOK] Payment marked as failed:", orderId);
          }
        }

        return NextResponse.json({ message: "Failure recorded" });
      }

      default:
        console.log("[WEBHOOK] Unhandled event type:", eventType);
        return NextResponse.json({ message: "Event type not handled" });
    }
  } catch (error: unknown) {
    console.error("[WEBHOOK] Processing error:", error);
    // Return 200 to prevent Razorpay from endlessly retrying on parse errors
    return NextResponse.json({ message: "Webhook processing error" }, { status: 200 });
  }
}
