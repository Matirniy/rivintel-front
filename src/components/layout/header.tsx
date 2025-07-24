"use client";

import Link from "next/link";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";

import LogoIcon from "../icons/logoIcon";
import UserModal from "./userModal";

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

          {open && <UserModal setOpen={setOpen} />}
        </div>
      </div>
    </header>
  );
}
