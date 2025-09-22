"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaMapMarkedAlt, FaFileExcel } from "react-icons/fa";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  BoltIcon,
} from "@heroicons/react/24/solid";

import SearchModal from "../modal/searchModal";
import ActionButton from "./filterButton";
import { useFiltersStore } from "@/store/filters";
import { useSortingStore } from "@/store/sorting";
import { useMapSearchStore } from "@/store/map";
import { downloadFile } from "@/lib/downloadFile";
import { triggerExcel } from "@/app/dashboard/actions";

export default function SearchBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [modalType, setModalType] = useState<
    "filters" | "map" | "sort" | "ai" | null
  >(null);
  const { filterConditions, addFilterCondition } = useFiltersStore();
  const { sortField, setSortField } = useSortingStore();
  const { searchText, lng, lat, radius, setSearchText } = useMapSearchStore();
  const [isLoading, setLoading] = useState(false);

  const closeModal = () => setModalType(null);

  const isDashboard = pathname === "/dashboard";

  function startSearch() {
    const params = new URLSearchParams();

    if (searchText.trim()) params.set("searchtext", searchText.trim());
    if (lat !== null) params.set("lat", lat.toString());
    if (lng !== null) params.set("lng", lng.toString());
    if (radius) params.set("radius", radius.toString());
    if (sortField) params.set("sort", sortField);

    if (filterConditions.length > 1) {
      const filtersJson = JSON.stringify(filterConditions);

      params.set("filters", encodeURIComponent(filtersJson));
    }

    const targetPath = `/dashboard?${params.toString()}`;

    if (pathname !== "/dashboard") {
      router.push(targetPath);
    }
  }

  const downloadExcel = async () => {
    if (!lat || !lng) return;

    setLoading(true);

    try {
      const params = { searchText, lat, lng, radius };

      const file = await triggerExcel(params);

      if (file) {
        downloadFile(file, "companies.xlsx");
      }
    } catch (error) {
      console.error("Download Excel error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto space-y-4">
      <div className="flex items-center">
        <div className="flex items-center w-full rounded-md">
          <input
            type="text"
            placeholder="Write type of business keyword"
            className="input input-bordered w-full rounded-r-none border-primary focus:outline-none focus:border-blue-900"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => startSearch()}
            className="btn btn-primary rounded-l-none"
          >
            <MagnifyingGlassIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-between [&>*]:mb-4 max-[700px]:justify-around max-[700px]:[&>*]:w-[42vw] max-[700px]:[&>*]:mx-2">
        <ActionButton
          count={filterConditions.length - 1}
          icon={<FunnelIcon className="w-5 h-5" />}
          label="Filters"
          onClick={() => setModalType("filters")}
        />

        {/* {isDashboard && (
          <ActionButton
            count={0}
            icon={<BoltIcon className="w-5 h-5" />}
            label="AI Analytics"
            onClick={() => setModalType("ai")}
          />
        )} */}

        {isDashboard && (
          <ActionButton
            count={0}
            icon={<FaMapMarkedAlt className="w-5 h-5" />}
            label="Map"
            onClick={() => setModalType("map")}
          />
        )}

        {isDashboard && (
          <ActionButton
            count={0}
            icon={<FaFileExcel className="w-5 h-5" />}
            label="Download Excel"
            isLoading={isLoading}
            onClick={downloadExcel}
          />
        )}

        <ActionButton
          count={sortField ? 1 : 0}
          icon={<ArrowsUpDownIcon className="w-5 h-5" />}
          label="Sort"
          onClick={() => setModalType("sort")}
        />
      </div>

      <SearchModal
        modalType={modalType}
        onClose={closeModal}
        sortField={sortField}
        setSortField={setSortField}
        filterConditions={filterConditions}
        addFilterCondition={addFilterCondition}
      />
    </div>
  );
}
