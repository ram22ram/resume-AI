import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// PLAN ENFORCEMENT: Free users can create 1 cover letter, Pro = unlimited
const FREE_COVER_LETTER_LIMIT = 1;

export async function POST(req: Request) {
  const body = await req.json();
  const { id, title, data, templateId } = body;

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!data || !templateId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Fetch fresh plan from DB
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true },
    });
    const isPro = user?.plan === "pro";

    // Free users: enforce cover letter limit on CREATE (not update)
    if (!id && !isPro) {
      const coverLetterCount = await prisma.coverLetter.count({
        where: { userId: session.user.id },
      });
      if (coverLetterCount >= FREE_COVER_LETTER_LIMIT) {
        return NextResponse.json(
          {
            error: "FREE_LIMIT_REACHED",
            message: `Free plan allows ${FREE_COVER_LETTER_LIMIT} cover letter. Upgrade to Pro for unlimited.`,
          },
          { status: 403 }
        );
      }
    }

    if (id) {
      const existing = await prisma.coverLetter.findUnique({ where: { id } });
      if (existing && existing.userId !== session.user.id) {
        return new NextResponse("Forbidden", { status: 403 });
      }
    }

    const coverLetter = await prisma.coverLetter.upsert({
      where: { id: id || "new-cover-placeholder" },
      update: {
        title: title || "Untitled Cover Letter",
        data,
        templateId,
      },
      create: {
        userId: session.user.id,
        title: title || "Untitled Cover Letter",
        data,
        templateId,
      },
    });

    return NextResponse.json(coverLetter);
  } catch (error: unknown) {
    const prismaError = error as { code?: string };
    if (prismaError.code === "P2025" || !id) {
      try {
        const session = await getServerSession(authOptions);
        const coverLetter = await prisma.coverLetter.create({
          data: {
            userId: session!.user.id,
            title: title || "Untitled Cover Letter",
            data,
            templateId,
          },
        });
        return NextResponse.json(coverLetter);
      } catch (_innerError) {
        return new NextResponse("Internal Server Error", { status: 500 });
      }
    }
    console.error("COVER_LETTER_SAVE_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
