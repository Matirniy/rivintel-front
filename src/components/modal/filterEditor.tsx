"use client";

import React from "react";

import { useFiltersStore } from "@/store/filters";
import FilterCondition from "./filterCondition";
import { PlaceFields } from "@/types/google";

export default function FilterEditor() {
  const { conditions, addCondition } = useFiltersStore();

  function addNewCondition() {
    addCondition({
      id: conditions.length,
      field: PlaceFields.UNSELECTED,
      value: true,
    });
  }

  return (
    <div className="h-[92%]">
      <div className="h-[88%] flex flex-col items-center overflow-auto">
        {conditions.map((_, i) => (
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
