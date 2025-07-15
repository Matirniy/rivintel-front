"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaMapMarkedAlt } from "react-icons/fa";

import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/solid";
import SearchModal from "../searchModal";

export default function SearchBar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [modalType, setModalType] = useState<"filters" | "map" | "sort" | null>(
    null
  );

  const closeModal = () => setModalType(null);

  const isDashboard = pathname === "/dashboard";

  return (
    <div className="w-full max-w-screen-xl mx-auto space-y-4">
      {/* Search input */}
      <div className="flex items-center gap-2">
        <div className="flex items-center w-full rounded-md bg-blue-100 p-2">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full rounded-r-none border-blue-300 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary rounded-l-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Buttons line under the search input */}
      <div className="flex justify-between">
        <button
          className="btn btn-outline btn-primary flex items-center gap-2"
          onClick={() => setModalType("filters")}
        >
          <FunnelIcon className="w-5 h-5" />
          Filters
        </button>

        {isDashboard ? (
          <>
            <button
              className="btn btn-outline btn-primary flex items-center gap-2"
              onClick={() => setModalType("map")}
            >
              <FaMapMarkedAlt className="w-4 h-4" />
              Map
            </button>

            <button
              className="btn btn-outline btn-primary flex items-center gap-2"
              onClick={() => setModalType("sort")}
            >
              <ArrowsUpDownIcon className="w-5 h-5" />
              Sort
            </button>
          </>
        ) : (
          <button
            className="btn btn-outline btn-primary flex items-center gap-2"
            onClick={() => setModalType("sort")}
          >
            <ArrowsUpDownIcon className="w-5 h-5" />
            Sort
          </button>
        )}
      </div>

      {/* Modal */}
      <SearchModal modalType={modalType} onClose={closeModal}>
        <div className="p-4">
          {modalType === "filters" && "Filter options here"}
          {modalType === "map" && "Map content here"}
          {modalType === "sort" && "Sort options here"}
        </div>
      </SearchModal>
    </div>
  );
}
