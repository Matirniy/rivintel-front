"use server";

import axios from "axios";
import { cookies } from "next/headers";

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import refreshApi, { refreshAccessToken } from "./refresh";

async function getTokens(): Promise<{
  accessToken: string | null;
  refreshToken: string | null;
  cookieStore: ReadonlyRequestCookies;
}> {
  const cookieStore = await cookies();

  return {
    accessToken: cookieStore.get("accessToken")?.value ?? null,
    refreshToken: cookieStore.get("refreshToken")?.value ?? null,
    cookieStore: cookieStore,
  };
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const { accessToken } = await getTokens();

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();
       
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      } 
    }

    return Promise.reject(error);
  }
);

export default api;
