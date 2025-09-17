import { SortOptions } from "./google.types";

export default interface SortingState {
  sortField: SortOptions | null;
  setSortField: (field: SortOptions) => void;
}
