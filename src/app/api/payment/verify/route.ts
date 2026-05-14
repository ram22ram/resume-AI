import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    // Input validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { message: "Missing required payment fields" },
        { status: 400 }
      );
    }

    // Verify the payment belongs to this user (ownership check)
    const payment = await prisma.payment.findUnique({
      where: { orderId: razorpay_order_id },
    });

    if (!payment) {
      console.error("[VERIFY] Payment record not found for order:", razorpay_order_id);
      return NextResponse.json({ message: "Payment record not found" }, { status: 404 });
    }

    if (payment.userId !== session.user.id) {
      console.error("[VERIFY] User mismatch:", session.user.id, "vs", payment.userId);
      return NextResponse.json({ message: "Payment ownership mismatch" }, { status: 403 });
    }

    // Replay protection — prevent re-verification of already completed payments
    if (payment.status === "completed") {
      console.log("[VERIFY] Payment already verified:", razorpay_order_id);
      return NextResponse.json({ message: "Payment already verified" });
    }

    // HMAC SHA256 signature verification
    const expectedBody = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(expectedBody)
      .digest("hex");

    const isAuthentic = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "hex"),
      Buffer.from(razorpay_signature, "hex")
    );

    if (isAuthentic) {
      await prisma.$transaction([
        prisma.user.update({
          where: { id: session.user.id },
          data: { plan: "pro" },
        }),
        prisma.payment.update({
          where: { orderId: razorpay_order_id },
          data: {
            status: "completed",
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
          },
        }),
      ]);

      console.log("[VERIFY] Payment verified successfully:", razorpay_payment_id, "User upgraded:", session.user.id);
      return NextResponse.json({ message: "Payment verified successfully" });
    } else {
      await prisma.payment.update({
        where: { orderId: razorpay_order_id },
        data: { status: "failed" },
      });

      console.error("[VERIFY] Signature mismatch for order:", razorpay_order_id);
      return NextResponse.json({ message: "Invalid payment signature" }, { status: 400 });
    }
  } catch (error: unknown) {
    console.error("PAYMENT_VERIFY_ERROR", error);
    return NextResponse.json(
      { message: "Payment verification failed. Contact support if charged." },
      { status: 500 }
    );
  }
}
