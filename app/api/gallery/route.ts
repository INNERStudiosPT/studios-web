import { fetchGalleryImages } from "@/lib/gallery";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const images = await fetchGalleryImages();
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch gallery images";
    return NextResponse.json({ success: false, error: message }, { status: 502 });
  }
}
