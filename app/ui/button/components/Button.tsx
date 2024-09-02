import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  primary?: boolean;
  icon?: React.ComponentType<any>;
}

export default function Button({
  children,
  className,
  primary = false,
  icon: Icon,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "flex h-10 items-center rounded-lg text-sm font-medium text-white transition-colors hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 active:bg-amber-700 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        primary ? "bg-amber-600" : "ring-1 ring-inset ring-amber-600",
        children ? "px-4" : "px-3",
        className,
      )}
    >
      {children}
      {Icon && <Icon className="ml-auto h-5 w-5 text-gray-50" />}
    </button>
  );
}
