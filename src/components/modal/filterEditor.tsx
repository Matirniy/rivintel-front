"use client";

import React from "react";

import FilterCondition from "./filterCondition";
import { PlacesFields } from "@/types/google";
import { FilterEditorProps } from "@/types/filterEditor.types";

export default function FilterEditor({
  filterConditions,
  addFilterCondition,
}: React.PropsWithChildren<FilterEditorProps>) {

  function addNewCondition() {
    addFilterCondition({
      id: filterConditions.length,
      field: PlacesFields.UNSELECTED,
      value: true,
    });
  }

  return (
    <div className="h-[92%]">
      <div className="h-[88%] flex flex-col items-center overflow-auto">
        {filterConditions?.map((_, i) => (
          <FilterCondition key={i} index={i} />
        ))}
      </div>

      <div className="border-t border-gray-300">
        <button
          onClick={addNewCondition}
          className="btn btn-outline btn-primary mt-2 btn-sm"
        >
          Add Condition
        </button>
      </div>
    </div>
  );
}
