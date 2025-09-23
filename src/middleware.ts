import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { isExpired } from "@/lib/auth";
import { refresh } from "./app/api/gen";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const response = NextResponse.next();

  if (!accessToken || accessToken.trim() === "" || isExpired(accessToken)) {
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken || refreshToken.trim() === "") return response;

    try {
      const { data } = await refresh({
        body: { refreshToken },
      });

      if (data) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data;

        response.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60,
        });

        response.cookies.set("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      }

      return response;
    } catch (e) {
      console.error("Refresh failed", e);

      return response;
    }
  }

  return response;
}
