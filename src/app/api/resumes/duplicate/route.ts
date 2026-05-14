import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true },
    });

    if (user?.plan !== "pro") {
      return NextResponse.json(
        {
          error: "PRO_REQUIRED",
          message: "Duplicating resumes is a Pro feature.",
        },
        { status: 403 }
      );
    }

    const { id } = await req.json();

    if (!id) {
      return new NextResponse("Missing resume ID", { status: 400 });
    }

    const existingResume = await prisma.resume.findUnique({
      where: { id },
    });

    if (!existingResume) {
      return new NextResponse("Resume not found", { status: 404 });
    }

    const duplicatedResume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title: `${existingResume.title} (Copy)`,
        data: existingResume.data as any, // 👈 safe fix
        templateId: existingResume.templateId,
      },
    });

    return NextResponse.json(duplicatedResume);

  } catch (error) {
    console.error("RESUME_DUPLICATE_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}