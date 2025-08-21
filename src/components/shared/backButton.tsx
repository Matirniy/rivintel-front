"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="btn btn-primary btn-sm flex items-center gap-2 group"
    >
      <FaArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
    </button>
  );
}
