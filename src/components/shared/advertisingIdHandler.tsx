"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function AdvertisingIdHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const aid = searchParams.get("aid");
    
    if (aid) localStorage.setItem("advertisingId", aid);
  }, [searchParams]);

  return null;
}
