import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ComponentType<any>;
}

export default function Input({ icon: Icon, ...props }: InputProps) {
  return (
    <div className="relative">
      <input
        className="peer block w-full rounded-md border border-amber-700 py-[9px] pl-10 text-sm outline-none bg-stone-900 placeholder:text-stone-500 focus:ring-1 focus:ring-inset focus:ring-amber-600"
        {...props}
      />
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-stone-500 peer-focus:text-amber-500" />
    </div>
  );
}
