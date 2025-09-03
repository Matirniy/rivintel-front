"use server";

import { refresh } from "@/app/api";
import { cookies } from "next/headers";

export async function triggerAuthRefresh() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return null;
    }

    return await refresh({
      body: { refreshToken },
    });
  } catch (error) {
    console.error("Auth refresh failed", error);
    return null;
  }
}
