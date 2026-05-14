import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

/**
 * GET /api/user/plan
 * Returns the current user's plan directly from the database.
 * Used by the frontend to verify plan status after payment,
 * bypassing potentially stale JWT session data.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true, email: true },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json({ plan: user.plan });
  } catch (error) {
    console.error("USER_PLAN_FETCH_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
