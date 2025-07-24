import { create } from "zustand";
import { persist } from "zustand/middleware";

import { logoutRequest } from "@/api/logoutRequest";
import { Users } from "@/api/models/Users";

type AuthState = {
  user: Users | null;
  setUser: (user: Users) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: async () => {
        try {
          await logoutRequest();
        } catch (e) {
          console.error("Logout failed", e);
        }

        set({ user: null });

        if (typeof document !== "undefined") {
          document.cookie = "accessToken=; path=/; max-age=0";
        }
      },
    }),
    { name: "auth-user" }
  )
);
