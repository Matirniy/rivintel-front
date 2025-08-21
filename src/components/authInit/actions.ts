"use server";

import { cookies } from "next/headers";

import { AuthService } from "@/app/api";

export async function triggerAuthRefresh() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return null;
    }

    return await AuthService.refresh({ refreshToken });
  } catch (error) {
    console.error("Auth refresh failed", error);
    return null;
  }
}
