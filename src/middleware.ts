import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

/**
 * Protects /cms routes (except /cms/login) by checking the JWT cookie.
 * Unauthenticated requests are redirected to /cms/login.
 *
 * API routes under /api/cms/* and /api/auth/* handle their own auth
 * within the route handler (they return JSON, not redirects).
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run for /cms pages (not /cms/login, not API routes)
  if (pathname.startsWith("/cms") && pathname !== "/cms/login") {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const payload = await verifyToken(token);

    if (!payload) {
      const loginUrl = new URL("/cms/login", request.url);
      // Preserve the intended destination for post-login redirect
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cms/:path*"],
};
