import { create } from "zustand";

import { PlaceFields } from "@/types/google";
import { FiltersState } from "@/types/filters.types";

export const useFiltersStore = create<FiltersState>((set) => ({
  filterConditions: [
    {
      id: 0,
      field: PlaceFields.UNSELECTED,
      value: false,
    },
  ],
  addFilterCondition: (condition) =>
    set((state) => ({
      conditions: [...state.conditions, condition],
    })),
  removeFilterCondition: (id) =>
    set((state) => ({
      conditions: state.conditions.filter((c) => c.id !== id),
    })),
  updateFilterCondition: (id, updatedCondition) =>
    set((state) => ({
      conditions: state.conditions.map((c) =>
        c.id === id ? updatedCondition : c
      ),
    })),
  clearFilterConditions: () => set({ conditions: [] }),
}));
