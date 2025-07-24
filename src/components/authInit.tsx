"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { AuthService } from "@/api";

export function AuthInit() {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (document.cookie.includes("refreshToken=")) {
          const data = await AuthService.refresh();

          setUser(data.user);

          document.cookie = `accessToken=${data.accessToken}; path=/; secure; samesite=strict`;
        }
      } catch (err: any) {
        if (err?.status === 401 || err?.status === 403) {
          logout();
        } else {
          console.error("Unexpected error in refresh:", err);
        }
      }
    };

    checkAuth();
  }, []);

  return null;
}
