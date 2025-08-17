import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/settings"];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (protectedRoutes.includes(request.nextUrl.pathname) && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
