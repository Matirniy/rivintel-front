"use client";

import Lottie from "lottie-react";
import loadingAnimation from "@/assets/loader.json";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
      <Lottie
        animationData={loadingAnimation}
        loop
        autoplay
        className="w-[70vw] max-w-screen max-h-screen"
      />
    </div>
  );
}
