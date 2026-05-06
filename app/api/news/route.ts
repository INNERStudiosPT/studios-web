import { fetchLatestNews } from "@/lib/news";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const news = await fetchLatestNews();
    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch news";
    return NextResponse.json({ success: false, error: message }, { status: 502 });
  }
}
