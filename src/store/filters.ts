import { create } from "zustand";

import { PlaceFields } from "@/types/google";

interface FilterCondition {
  id: number;
  field: PlaceFields;
  value: any;
}

interface FiltersState {
  conditions: FilterCondition[];
  addCondition: (condition: FilterCondition) => void;
  removeCondition: (id: number) => void;
  updateCondition: (id: number, condition: FilterCondition) => void;
  clearConditions: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  conditions: [
    {
      id: 0,
      field: PlaceFields.UNSELECTED,
      value: false,
    },
  ],
  addCondition: (condition) =>
    set((state) => ({
      conditions: [...state.conditions, condition],
    })),
  removeCondition: (id) =>
    set((state) => ({
      conditions: state.conditions.filter((c) => c.id !== id),
    })),
  updateCondition: (id, updatedCondition) =>
    set((state) => ({
      conditions: state.conditions.map((c) =>
        c.id === id ? updatedCondition : c
      ),
    })),
  clearConditions: () => set({ conditions: [] }),
}));
