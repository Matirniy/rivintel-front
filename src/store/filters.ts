import { create } from "zustand";

import { PlacesFields } from "@/types/google.types";
import { FiltersState } from "@/types/filters.types";

export const useFiltersStore = create<FiltersState>((set) => ({
  filterConditions: [
    {
      id: 0,
      field: PlacesFields.UNSELECTED,
      value: false,
    },
  ],
  addFilterCondition: (condition) =>
    set((state) => ({
      filterConditions: [...state.filterConditions, condition],
    })),
  removeFilterCondition: (id) =>
    set((state) => ({
      filterConditions: state.filterConditions.filter((c) => c.id !== id),
    })),
  updateFilterCondition: (id, updatedCondition) =>
    set((state) => ({
      filterConditions: state.filterConditions.map((c) =>
        c.id === id ? updatedCondition : c
      ),
    })),
  clearFilterConditions: () => set({ filterConditions: [] }),
}));
