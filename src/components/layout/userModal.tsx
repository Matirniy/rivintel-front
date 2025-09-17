"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserModalProps } from "@/types/userModal.types";
import browserApi from "@/lib/browserApi";

export default function UserModal({ setOpen, user, logout }: UserModalProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await browserApi.post("/api/auth/logout");

      logout();
      setOpen(false);

      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <div className="absolute right-0 mt-2.5 w-56 bg-base-100 shadow-lg rounded p-4 z-50">
      <div className="flex flex-col space-y-2">
        {user ? (
          <>
            <div className="text-center space-y-2">
              <p className="text-sm">
                Logged in as <strong className="text-base">{user.name}</strong>
              </p>

              <p className="text-sm">
                Subscription:{" "}
                {user.isSubscribed ? (
                  <span className="text-green-600 font-semibold">Active</span>
                ) : (
                  <span className="text-red-500 font-semibold">Not Active</span>
                )}
              </p>

              <button
                className="btn btn-primary btn-sm w-full"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
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
