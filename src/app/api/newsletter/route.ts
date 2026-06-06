import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstname, lastname, tags = [] } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const mauticApiUrl = process.env.MAUTIC_API_URL;
    const username = process.env.MAUTIC_API_USERNAME;
    const password = process.env.MAUTIC_API_PASSWORD;

    if (!mauticApiUrl || !username || !password) {
      console.warn("Mautic API credentials not configured");
      return NextResponse.json({ success: true, warning: "Mautic not configured" });
    }

    const auth = Buffer.from(`${username}:${password}`).toString("base64");

    // Mautic 5 requires application/x-www-form-urlencoded for Basic Auth
    const formData = new URLSearchParams();
    formData.append("email", email);
    if (firstname) formData.append("firstname", firstname);
    if (lastname) formData.append("lastname", lastname);
    // Always tag as newsletter + any extra tags passed by the caller
    const allTags = ["newsletter", ...tags];
    formData.append("tags", allTags.join("|"));

    const response = await fetch(`${mauticApiUrl}/contacts/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
        "Authorization": `Basic ${auth}`
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Mautic API Error:", response.status, errorText);
      return NextResponse.json({ success: true, warning: "Mautic API failed" });
    }

    const mauticData = await response.json();
    return NextResponse.json({ success: true, contact: mauticData.contact });
  } catch (error) {
    console.error("Error in newsletter API route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
