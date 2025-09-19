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

        if (
          jsonResponse &&
          typeof jsonResponse.statusCode === "number" &&
          (jsonResponse.statusCode < 200 || jsonResponse.statusCode >= 300)
        ) {
          console.log(
            `API RESPONSE STATUS: \x1b[31m${jsonResponse.statusCode}\x1b[0m`
          );

          const err = new Error(
            `HTTP error: \x1b[31m${jsonResponse.statusCode}\x1b[0m ${
              jsonResponse.message
                ? `- ${
                    Array.isArray(jsonResponse.message)
                      ? jsonResponse.message.join("; ")
                      : String(jsonResponse.message)
                  }`
                : ""
            }`
          );
          
          console.error(JSON.stringify(jsonResponse, null, 2));

          throw err
        }

        console.log(`API RESPONSE STATUS: \x1b[32m${jsonResponse.statusCode}\x1b[0m`);

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
