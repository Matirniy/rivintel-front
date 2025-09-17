import { FilterCondition } from "./filters.types";
import { SortOptions } from "./google.types";

export interface TriggerGoogleParams {
  searchText: string;
  lat: number;
  lng: number;
  radius: number;
  sortField: SortOptions | null;
  filterConditions: FilterCondition[];
  isSubscribed: boolean;
  page: number;
}

export interface TriggerAnalyzeParams {
  searchText: string;
  lat: number;
  lng: number;
  radius: number;
}
