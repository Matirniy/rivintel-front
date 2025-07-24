"use client";

import { useSortingStore } from "@/store/sorting";
import { PlaceFields } from "@/types/google";

export default function SortEditor() {
  const { sortField, setSortField } = useSortingStore();

  return (
    <div className="flex flex-col space-y-4">
      <h5 className="font-semibold">Sort by field:</h5 >
      <select
        className="select select-bordered w-full cursor-pointer focus:outline-none focus:ring-0"
        value={sortField ?? ""}
        onChange={(e) => setSortField(e.target.value as PlaceFields)}
      >
        <option value="" disabled>
          Select a field to sort
        </option>
        {Object.entries(PlaceFields).map(([key, value]) => (
          <option key={value} value={value}>
            {key.replace(/_/g, " ")}
          </option>
        ))}
      </select>
    </div>
  );
}
