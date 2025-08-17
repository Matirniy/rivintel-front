import axios from "axios";
import { cookies } from "next/headers";

async function getTokens(): Promise<{
  accessToken: string | null;
}> {
  const cookieStore = await cookies();

  return {
    accessToken: cookieStore.get("accessToken")?.value ?? null,
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

export default api;
