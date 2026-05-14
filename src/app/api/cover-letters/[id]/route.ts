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

    const coverLetter = await prisma.coverLetter.findUnique({
      where: { id: params.id },
    });

    if (!coverLetter) {
      return new NextResponse("Not Found", { status: 404 });
    }
    if (coverLetter.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    return NextResponse.json(coverLetter);
  } catch (error) {
    console.error("COVER_LETTER_GET_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// FIX: DELETE was missing — dashboard "Delete" button was calling this route
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const coverLetter = await prisma.coverLetter.findUnique({
      where: { id: params.id },
    });

    if (!coverLetter) {
      return new NextResponse("Not Found", { status: 404 });
    }
    if (coverLetter.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await prisma.coverLetter.delete({ where: { id: params.id } });
    return new NextResponse("Deleted", { status: 200 });
  } catch (error) {
    console.error("COVER_LETTER_DELETE_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
