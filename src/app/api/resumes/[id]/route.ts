import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const resume = await prisma.resume.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!resume) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (resume.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    return NextResponse.json(resume);
  } catch (error: unknown) {
    console.error("RESUME_FETCH_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const resume = await prisma.resume.findUnique({
      where: { id: params.id },
    });

    if (!resume) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (resume.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await prisma.resume.delete({
      where: { id: params.id },
    });

    return new NextResponse("Deleted", { status: 200 });
  } catch (error: unknown) {
    console.error("RESUME_DELETE_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
