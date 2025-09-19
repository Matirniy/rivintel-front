"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";

import FilterEditor from "./filterEditor";
import GoogleMap from "../shared/googleMap";
import SortEditor from "./sortEditor";
import type { SearchModalProps } from "@/types/searchModal.types";
import Analytics from "./analytics";

export default function SearchModal({
  modalType,
  onClose,
  sortField,
  setSortField,
  filterConditions,
  addFilterCondition,
}: React.PropsWithChildren<SearchModalProps>) {
  if (!modalType) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`
          bg-base-100 p-3 rounded shadow-md relative
          w-[90vw] h-[70vh]
          sm:w-[75vw] sm:h-[65vh]
          md:w-[75vw] md:h-[75vh]
          lg:w-[75vw] lg:h-[75vh]
          max-w-[900px]
          max-h-[90vh]
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-end justify-end border-b border-gray-300 mb-3 pb-2">
          <button
            onClick={onClose}
            className="rounded hover:bg-base-200 transition cursor-pointer"
            aria-label="Close"
          >
            <XMarkIcon className="w-5 h-5 text-primary stroke-2 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Content */}
        {modalType === "filters" && filterConditions && addFilterCondition && (
          <FilterEditor
            filterConditions={filterConditions}
            addFilterCondition={addFilterCondition}
          />
        )}
        {modalType === "sort" && (
          <SortEditor sortField={sortField} setSortField={setSortField} />
        )}
        {modalType === "map" && <GoogleMap />}
        {modalType === "ai" && <Analytics isSubscribed />}

        {/* Footer with bigger button on large screens */}
        <div className="flex items-end justify-end mt-4 md:mt-2">
          <button
            onClick={onClose}
            className="
              btn btn-primary text-xs text-white h-[35px] px-4
              md:text-sm md:h-[40px] md:px-6
            "
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
