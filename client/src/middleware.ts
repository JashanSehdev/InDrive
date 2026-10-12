import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
  const protected_routes = [ "/dashboard", "/driver/dashboard"]
  const isAuthenticated = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;
   if (!isAuthenticated && protected_routes.includes(pathname) || pathname.startsWith('/driver/') ){
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAuthenticated &&( pathname === "/login" || pathname ==="/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  NextResponse.next()
}

export const config = {
  matcher: ["/register", "/login", "/dashboard"]
  // , "/driver/:path*"],
};