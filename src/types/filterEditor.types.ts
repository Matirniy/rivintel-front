import { SearchModalProps } from "./searchModal.types";

export type FilterEditorProps = Required<
  Pick<SearchModalProps, "filterConditions" | "addFilterCondition">
>;
