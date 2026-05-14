import { NextResponse } from "next/server";
import { syncJobs } from "@/lib/jobs";

export async function POST() {
  try {
    const count = await syncJobs();
    return NextResponse.json({ message: "Jobs synced successfully", count });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
