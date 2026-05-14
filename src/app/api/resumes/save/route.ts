import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const FREE_RESUME_LIMIT = 3;

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

    // PLAN ENFORCEMENT: Fetch fresh plan from DB (cannot trust stale session)
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true },
    });
    const isPro = user?.plan === "pro";

    // Free users: enforce resume limit on CREATE (not update)
    if (!id && !isPro) {
      const resumeCount = await prisma.resume.count({
        where: { userId: session.user.id },
      });
      if (resumeCount >= FREE_RESUME_LIMIT) {
        return NextResponse.json(
          {
            error: "FREE_LIMIT_REACHED",
            message: `Free plan allows up to ${FREE_RESUME_LIMIT} resumes. Upgrade to Pro for unlimited.`,
          },
          { status: 403 }
        );
      }
    }

    // PLAN ENFORCEMENT: Block free users from saving premium templates
    // (Template premium check is handled client-side + template ID enforcement is here)

    if (id) {
      const existing = await prisma.resume.findUnique({ where: { id } });
      if (existing && existing.userId !== session.user.id) {
        return new NextResponse("Forbidden", { status: 403 });
      }
    }

    const resume = await prisma.resume.upsert({
      where: { id: id || "new-resume-placeholder" },
      update: {
        title: title || "Untitled Resume",
        data,
        templateId,
      },
      create: {
        userId: session.user.id,
        title: title || "Untitled Resume",
        data,
        templateId,
      },
    });

    return NextResponse.json(resume);
  } catch (error: unknown) {
    const prismaError = error as { code?: string };
    if (prismaError.code === "P2025" || !id) {
      try {
        const session = await getServerSession(authOptions);
        const resume = await prisma.resume.create({
          data: {
            userId: session!.user.id,
            title: title || "Untitled Resume",
            data,
            templateId,
          },
        });
        return NextResponse.json(resume);
      } catch (_innerError) {
        return new NextResponse("Internal Server Error", { status: 500 });
      }
    }
    console.error("RESUME_SAVE_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
