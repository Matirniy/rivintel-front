"use client";

import Link from "next/link";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";

import LogoIcon from "../icons/logoIcon";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-base-100 shadow px-2 py-2">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link href="/">
          <LogoIcon className="h-10 w-auto text-primary" />
        </Link>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="btn btn-ghost btn-circle text-primary"
          >
            <FaUser className="h-5 w-5" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2.5 w-56 bg-base-100 shadow-lg rounded p-4 z-50">
              {/* TODO: check auth status */}
              <div className="flex flex-col space-y-2">
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
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
