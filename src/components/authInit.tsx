"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/store/auth";

export function AuthInit() {
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const checkAuth = async () => {
      const hasAccessToken = document.cookie.includes("accessToken=");

      if (!hasAccessToken) {
        logout();
      }
    };

    checkAuth();
  }, []);

  return null;
}
