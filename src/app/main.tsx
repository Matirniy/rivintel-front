"use client";

import GoogleMap from "@/components/googleMap";
import SearchBar from "@/components/shared/searchBar";

export default function Main() {
  return (
    <div className="max-w-[1440px] mx-auto px-2 py-4 space-y-4">
      <SearchBar />

      <div className="h-[calc(100vh-280px)] w-full rounded-md overflow-hidden">
        <GoogleMap />
      </div>
    </div>
  );
}
