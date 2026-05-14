import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.warn("[RAZORPAY] Keys not configured — payment will fail in production");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

const PLAN_AMOUNT = 19900; // ₹199 in paise

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch fresh plan from DB to prevent stale-session bypass
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true },
    });

    if (user?.plan === "pro") {
      return NextResponse.json(
        { message: "You are already on the Pro plan." },
        { status: 400 }
      );
    }

    // Check for existing pending orders to prevent duplicate order creation
    const existingPending = await prisma.payment.findFirst({
      where: {
        userId: session.user.id,
        status: "pending",
        // Only consider orders created in the last 30 minutes
        createdAt: { gte: new Date(Date.now() - 30 * 60 * 1000) },
      },
      orderBy: { createdAt: "desc" },
    });

    // If a recent pending order exists, return it instead of creating a new one
    if (existingPending) {
      try {
        const existingOrder = await razorpay.orders.fetch(existingPending.orderId);
        if (existingOrder.status === "created") {
          console.log("[PAYMENT] Reusing existing pending order:", existingOrder.id);
          return NextResponse.json(existingOrder);
        }
      } catch {
        // Order might have expired on Razorpay's side, create a new one
        console.log("[PAYMENT] Stale pending order, creating fresh one");
      }
    }

    const order = await razorpay.orders.create({
      amount: PLAN_AMOUNT,
      currency: "INR",
      receipt: `rcpt_${session.user.id.slice(0, 8)}_${Date.now()}`,
      notes: {
        userId: session.user.id,
        plan: "pro",
        email: session.user.email || "",
      },
    });

    await prisma.payment.create({
      data: {
        userId: session.user.id,
        orderId: order.id,
        amount: PLAN_AMOUNT,
        status: "pending",
      },
    });

    console.log("[PAYMENT] Order created:", order.id, "for user:", session.user.id);
    return NextResponse.json(order);
  } catch (error: unknown) {
    console.error("PAYMENT_ORDER_ERROR", error);
    return NextResponse.json(
      { message: "Failed to create payment order. Please try again." },
      { status: 500 }
    );
  }
}
