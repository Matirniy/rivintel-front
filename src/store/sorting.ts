import { create } from "zustand";

import SortingState from "@/types/sorting.types";

export const useSortingStore = create<SortingState>((set) => ({
  sortField: null,
  setSortField: (field) => set({ sortField: field }),
}));
