import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuthStore } from "@/store/auth";

export const withAuth = (Component: React.FC) => {
  return function Protected() {
    const user = useAuthStore((s) => s.user);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.replace("/login");
      }
    }, [user]);

    if (!user) return null;

    return <Component />;
  };
};
