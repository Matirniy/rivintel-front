"use client";

import Link from "next/link";
import { useState } from "react";
import { FaUser, FaUserSlash } from "react-icons/fa6";

import LogoIcon from "../icons/logoIcon";
import UserModal from "./userModal";
import ThemeToggle from "../shared/themeToggle";
import { useAuthStore } from "@/store/auth";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 bg-base-100 shadow-sm px-3 py-2 sm:px-4">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center">
        <Link href="/" className="shrink-0">
          <LogoIcon className="h-8 w-auto text-primary sm:h-10" />
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="btn btn-ghost btn-circle text-primary"
            >
              {user ? (
                <FaUser className="h-5 w-5" />
              ) : (
                <FaUserSlash size={24} />
              )}
            </button>

            {open && (
              <UserModal setOpen={setOpen} user={user} logout={logout} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
