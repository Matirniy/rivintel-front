"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import FilterEditor from "./filterEditor";
import GoogleMap from "../shared/googleMap";
import SortEditor from "./sortEditor";

interface SearchModalProps {
  modalType: "filters" | "map" | "sort" | null;
  onClose: () => void;
}

export default function SearchModal({
  modalType,
  onClose,
}: React.PropsWithChildren<SearchModalProps>) {
  if (!modalType) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-11"
      onClick={onClose}
    >
      <div
        className={`
          bg-base-100 p-3 rounded shadow-md relative
          w-full h-[70vh]
          sm:w-[50vw] sm:h-[50vh]
          max-w-[650px]
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-end justify-end border-b border-gray-300 mb-3 pb-2">
          <button
            onClick={onClose}
            className="rounded hover:bg-base-200 transition cursor-pointer"
            aria-label="Close"
          >
            <XMarkIcon className="w-5 h-5 text-primary stroke-2" />
          </button>
        </div>

        {modalType === "filters" && <FilterEditor />}
        {modalType === "sort" && <SortEditor />}
        {modalType === "map" && <GoogleMap />}
      </div>
    </div>
  );
}
