import axios from "axios";

function getAccessToken(): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(/(?:^|; )accessToken=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        document.cookie = `accessToken=${newAccessToken}; path=/; secure; samesite=strict`;

        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
