import { create } from "zustand";

interface MapSearchState {
  lng: number | null;
  lat: number | null;
  searchText: string;
  setLng: (lng: number | null) => void;
  setLat: (lat: number | null) => void;
  setSearchText: (text: string) => void;
}

export const useMapSearchStore = create<MapSearchState>((set) => ({
  lng: null,
  lat: null,
  searchText: "",
  setLng: (lng) => set({ lng }),
  setLat: (lat) => set({ lat }),
  setSearchText: (text) => set({ searchText: text }),
}));
