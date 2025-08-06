"use client";

import GoogleMap from "@/components/shared/googleMap";
import SearchBar from "@/components/shared/searchBar";

export default function Main() {
  return (
    <div className="max-w-[1440px] h-[100%] mx-auto px-2 py-4 space-y-4">
      <SearchBar />

      <div className="w-full h-[calc(100%-64px)] rounded-md overflow-hidden">
        <GoogleMap />
      </div>
    </div>
  );
}
