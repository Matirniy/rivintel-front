import { PlaceFields } from "./google";

export interface FilterCondition {
  id: number;
  field: PlaceFields;
  value: any;
}

export interface FiltersState {
  filterConditions: FilterCondition[];
  addFilterCondition: (condition: FilterCondition) => void;
  removeFilterCondition: (id: number) => void;
  updateFilterCondition: (id: number, condition: FilterCondition) => void;
  clearFilterConditions: () => void;
}
