import type { Dispatch, SetStateAction } from "react";

import { Users } from "@/app/api";

export interface UserModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: Users | null;
  logout: () => void;
}
