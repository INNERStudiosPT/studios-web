import { fetchPartners } from "@/lib/partners";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const partners = await fetchPartners();
    return NextResponse.json({ success: true, data: partners });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch partners";
    return NextResponse.json({ success: false, error: message }, { status: 502 });
  }
}
