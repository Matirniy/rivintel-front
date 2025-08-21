"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { triggerAuthRefresh } from "./actions";
import { useRouter } from "next/navigation";

export function AuthInit() {
  const { user, setUser, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      if (!user) {
        try {
          const res = await triggerAuthRefresh();
          const refreshedUser = res?.data?.user;

          if (refreshedUser) {
            logout();
            setUser(refreshedUser);
          } else {
            router.push("/login");
          }
        } catch (error) {
          logout();
          router.push("/login");
        }
      }
    };

    initAuth();
  }, [user, setUser, router]);

  return null;
}
