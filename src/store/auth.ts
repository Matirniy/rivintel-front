import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Users } from "@/app/api/models/Users";

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
      },
    }),
    { name: "auth-user" }
  )
);
