import { SortOptions } from "./google";

export default interface SortingState {
  sortField: SortOptions | null;
  setSortField: (field: SortOptions) => void;
}
