import { CAREERS_API_BASE } from "@/lib/careers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const name = payload.name;
    const email = payload.email;
    const phone = payload.phone || null;
    const interests = payload.interests || [];
    const message = payload.message;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${CAREERS_API_BASE}/api/v1/content/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        interests,
        message,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const error = data?.detail || data?.error || data?.message || "Failed to send contact submission";
      return NextResponse.json({ success: false, error }, { status: response.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send contact submission";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
