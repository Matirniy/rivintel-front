"use client";

import cn from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";

type LoadingButtonProps = {
  isLoading?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function LoadingButton({ isLoading, children, className, ...props }: LoadingButtonProps) {
  return (
    <button
      className={cn("btn btn-primary w-full", className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <span className="loading loading-spinner loading-sm mr-2" />
      )}
      {children}
    </button>
  );
}
