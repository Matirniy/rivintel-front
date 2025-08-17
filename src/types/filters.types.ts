import { PlacesFields } from "./google";

export interface FilterCondition {
  id: number;
  field: PlacesFields;
  value: boolean;
}

export interface FiltersState {
  filterConditions: FilterCondition[];
  addFilterCondition: (condition: FilterCondition) => void;
  removeFilterCondition: (id: number) => void;
  updateFilterCondition: (id: number, condition: FilterCondition) => void;
  clearFilterConditions: () => void;
}
PlacesFields