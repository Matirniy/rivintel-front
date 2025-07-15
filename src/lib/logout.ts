import api from "@/lib/axios";

export async function logout() {
  await api.post("/api/auth/logout");

  document.cookie = `accessToken=; path=/; max-age=0`;

  window.location.href = "/login";
}
