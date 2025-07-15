import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.set("refreshToken", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });

  response.cookies.set("accessToken", "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}
