import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  filled?: boolean;
}

export function Button({
  children,
  className,
  filled = true,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "flex h-10 items-center px-4 rounded-lg text-sm font-medium text-white transition-colors hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 active:bg-amber-700 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        filled && "bg-amber-600",
        !filled && "ring-1 ring-inset ring-amber-600",
        className,
      )}
    >
      {children}
    </button>
  );
}
