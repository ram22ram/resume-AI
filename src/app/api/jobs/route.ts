import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { syncJobs } from "@/lib/jobs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location") || "";
  const role = searchParams.get("role") || "";

  try {
    // 1. Fetch from database
    let jobs = await db.job.findMany({
      where: {
        AND: [
          { title: { contains: role, mode: 'insensitive' } },
          { location: { contains: location, mode: 'insensitive' } }
        ]
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    // 2. Fallback if empty - Trigger live sync
    if (jobs.length === 0) {
      await syncJobs(location || "india", role || "developer");
      jobs = await db.job.findMany({
        where: {
          AND: [
            { title: { contains: role, mode: 'insensitive' } },
            { location: { contains: location, mode: 'insensitive' } }
          ]
        },
        orderBy: { createdAt: 'desc' },
        take: 20
      });
    }

    return NextResponse.json({ data: jobs });
  } catch (error: unknown) {
    console.error("Job API Error:", error);
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
