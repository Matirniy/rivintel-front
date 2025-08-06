import { FiltersState } from "./filters.types";
import SortingState from "./sorting.types";

export interface SearchModalProps
  extends Pick<SortingState, "sortField" | "setSortField">,
    Pick<FiltersState, "filterConditions" | "addFilterCondition"> {
  modalType: "filters" | "map" | "sort" | null;
  onClose: () => void;
}
