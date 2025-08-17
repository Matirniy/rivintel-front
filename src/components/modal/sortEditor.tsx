"use client";

import { PlacesFields, SortOptions } from "@/types/google";
import { SortEditorProps } from "@/types/sortEditor.types";

export default function SortEditor({
  sortField,
  setSortField,
}: React.PropsWithChildren<SortEditorProps>) {
  return (
    <div className="flex flex-col space-y-4">
      <h5 className="font-semibold">Sort by field:</h5>
      <select
        className="select select-bordered w-full cursor-pointer focus:outline-none focus:ring-0"
        value={sortField ?? ""}
        onChange={(e) => setSortField(e.target.value as SortOptions)}
      >
        <option value="" disabled>
          Select a field to sort
        </option>
        {Object.entries(PlacesFields).map(([key, value]) => (
          <option key={value} value={value}>
            {key.replace(/_/g, " ")}
          </option>
        ))}
      </select>
    </div>
  );
}
