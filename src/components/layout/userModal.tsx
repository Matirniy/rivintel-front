"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { UserModalProps } from "@/types/userModal.types";

export default function UserModal({ setOpen }: UserModalProps) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    logout();
    setOpen(false);

    router.push("/login");
  };

  return (
    <div className="absolute right-0 mt-2.5 w-56 bg-base-100 shadow-lg rounded p-4 z-50">
      <div className="flex flex-col space-y-2">
        {user ? (
          <>
            <p className="text-sm text-center">
              Logged in as <strong>{"user.name"}</strong>
            </p>
            <button className="btn btn-primary btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="btn btn-primary btn-sm"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
            <p className="text-xs text-center">
              Don&apos;t have an account yet?
            </p>
            <Link
              href="/signup"
              className="btn btn-outline btn-sm"
              onClick={() => setOpen(false)}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
