import { ButtonHTMLAttributes, ReactNode } from "react";

export default interface ActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  count?: number;
}
