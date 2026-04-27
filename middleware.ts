import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Check if user is authenticated by looking for Supabase access token
  const token = request.cookies.get("sb-access-token")?.value;

  // Protect /dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
