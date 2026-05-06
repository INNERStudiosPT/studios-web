import { fetchCareerJobs } from "@/lib/careers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const jobs = await fetchCareerJobs();
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch career jobs";
    return NextResponse.json({ success: false, error: message }, { status: 502 });
  }
}
