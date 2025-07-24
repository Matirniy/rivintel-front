import type { Dispatch, SetStateAction } from "react";

export interface UserModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}