import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  primary?: boolean;
  disabled?: boolean;
  icon?: React.ComponentType<any>;
}

export default function Button({
  children,
  className,
  primary = false,
  icon: Icon,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "flex h-10 items-center rounded-lg text-sm font-medium text-stone-300 transition-colors aria-disabled:cursor-not-allowed aria-disabled:opacity-50 transition-all",
        primary ? "bg-amber-700" : "ring-1 ring-inset ring-amber-700",
        children ? "px-4" : "px-3",
        disabled
          ? "ring-stone-600"
          : "hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 active:bg-amber-800",
        className,
      )}
      disabled={disabled}
    >
      {children}
      {Icon && (
        <Icon
          className={clsx(
            "ml-auto h-5 w-5 ",
            disabled ? "text-stone-600" : "text-stone-300",
          )}
        />
      )}
    </button>
  );
}
