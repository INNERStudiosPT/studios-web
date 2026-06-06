import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_PATHS = [
  "/coming-soon",
  "/company/careers",  // Careers page is live
  "/api/",
  "/_next/",
  "/fonts/",
  "/images/",
  "/logo",
  "/favicon",
  "/robots",
  "/sitemap",
  "/privacy",
  "/terms",
  "/ingest",
  "/cookie-policy",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow if path starts with any allowed prefix
  const isAllowed = ALLOWED_PATHS.some((p) => pathname.startsWith(p));

  if (!isAllowed) {
    const url = request.nextUrl.clone();
    url.pathname = "/coming-soon";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
