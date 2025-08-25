import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Users } from "@/app/api/models/Users";

type AuthState = {
  user: Users | null;
  hydrated: boolean;
  setUser: (user: Users) => void;
  logout: () => void;
  setHydrated: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "auth-user",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
