import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("user_token");

  // redirect logged-in users from login or register to dashboard
  if (["/login", "/register"].some((path) => request.nextUrl.pathname.startsWith(path))) {
    if (token && token.value) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // redirect users without token from dashboard to login
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token || !token.value) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
