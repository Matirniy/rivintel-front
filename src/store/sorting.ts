import { create } from "zustand";

import { PlaceFields } from "@/types/google";

interface SortingState {
  sortField: PlaceFields | null;
  setSortField: (field: PlaceFields) => void;
}

export const useSortingStore = create<SortingState>((set) => ({
  sortField: null,
  setSortField: (field) => set({ sortField: field }),
}));
