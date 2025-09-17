"use client";

import React from "react";

import { useFiltersStore } from "@/store/filters";
import { PlacesFields } from "@/types/google.types";
import { PlaceFieldLabels } from "./constant";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function FilterCondition({ index }: { index: number }) {
  const { filterConditions, updateFilterCondition, removeFilterCondition } =
    useFiltersStore();

  const condition = filterConditions[index];

  function onFieldChange(e: React.ChangeEvent<HTMLSelectElement>) {
    updateFilterCondition(index, {
      ...condition,
      field: e.target.value as PlacesFields,
    });
  }

  function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.checked;

    updateFilterCondition(index, { ...condition, value: value });
  }

  return (
    <div className="flex items-center justify-between w-[100%] gap-1 my-2 text-sm">
      <select
        value={condition.field}
        onChange={onFieldChange}
        className="select select-bordered select-sm focus:outline-none focus:ring-0 w-[85%]"
      >
        {Object.entries(PlacesFields).map(([key, val]) => (
          <option key={val} value={val}>
            {PlaceFieldLabels[val] || val}
          </option>
        ))}
      </select>

      {typeof condition.value === "boolean" ? (
        <label className="relative inline-flex items-center justify-center w-[2rem] h-8 border border-gray-300 rounded-md cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(condition.value)}
            onChange={onValueChange}
            className="sr-only peer"
          />
          <svg
            className="w-4.5 h-4.5 text-primary hidden peer-checked:block pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </label>
      ) : (
        <input
          type="text"
          value={condition.value as string}
          onChange={onValueChange}
          className="input input-bordered input-sm"
        />
      )}

      <button
        onClick={() => removeFilterCondition(index)}
        className="rounded hover:bg-base-200 transition cursor-pointer"
        aria-label="Close"
      >
        <XMarkIcon className="w-5 h-5 text-error stroke-2" />
      </button>
    </div>
  );
}
