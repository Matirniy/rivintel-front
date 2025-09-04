import type { AxiosResponse } from "axios";
import type { CreateClientConfig } from "@hey-api/client-axios";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

async function getTokens(): Promise<{ accessToken: string | null }> {
  const cookieStore = await cookies();

  return {
    accessToken: cookieStore.get("accessToken")?.value ?? null,
  };
}

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseURL: API_BASE,
  withCredentials: true,
  transformResponse: (response: AxiosResponse, headers?: any) => {
    const contentType =
      headers?.["content-type"] || headers?.["Content-Type"] || "";

    if (contentType.includes("application/json")) {
      try {
        const jsonResponse =
          typeof response === "string" ? JSON.parse(response) : response;

        if (jsonResponse.data && !jsonResponse.page) return jsonResponse.data;

        return jsonResponse;
      } catch {
        return response;
      }
    }

    return response;
  },

  auth: async () => {
    const { accessToken } = await getTokens();

    return accessToken ? accessToken : "";
  },
});
