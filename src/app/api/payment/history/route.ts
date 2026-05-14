import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

/**
 * GET /api/payment/history
 * Returns the current user's payment history.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payments = await prisma.payment.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        orderId: true,
        paymentId: true,
        amount: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ payments });
  } catch (error) {
    console.error("PAYMENT_HISTORY_ERROR", error);
    return NextResponse.json(
      { message: "Failed to fetch payment history" },
      { status: 500 }
    );
  }
}
