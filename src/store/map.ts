import { create } from "zustand";

interface MapSearchState {
  lng: number | null;
  lat: number | null;
  searchText: string;
  radius: number;
  setLng: (lng: number | null) => void;
  setLat: (lat: number | null) => void;
  setSearchText: (text: string) => void;
  setRadius: (radius: number) => void;
}

export const useMapSearchStore = create<MapSearchState>((set) => ({
  lng: null,
  lat: null,
  searchText: "",
  radius: 0,
  setLng: (lng) => set({ lng }),
  setLat: (lat) => set({ lat }),
  setSearchText: (text) => set({ searchText: text }),
  setRadius: (radius) => set({ radius }),
}));
