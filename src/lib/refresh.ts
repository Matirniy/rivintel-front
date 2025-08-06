"use server";

import { cookies } from "next/headers";

import { AuthRefreshRequest, AuthService } from "@/api";

export async function refreshAccessToken(): Promise<{
  accessToken: string;
  refreshToken: string;
} | void> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) throw new Error("No refresh token");

  try {
    const requestBody: AuthRefreshRequest = {
      refreshToken,
    };

    const { data } = await AuthService.refresh(requestBody);

    const accessToken = data.accessToken as string;
    const newRefreshToken = data.refreshToken as string;

    cookieStore.set("accessToken", accessToken, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 120,
    });

    cookieStore.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    console.error("Token refresh failed", error);
  }
}
