import { create } from "zustand";
import { persist } from "zustand/middleware";

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
        set({ user: null });

        if (typeof document !== "undefined") {
          document.cookie = "accessToken=; path=/; max-age=0";
        }
      },
    }),
    { name: "auth-user" }
  )
);
