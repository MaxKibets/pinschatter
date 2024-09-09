import React from "react";
import { Logo } from "@/app/ui";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="mx-auto flex w-full max-w-[400px] flex-col space-y-5 p-4">
        <Logo />
        {children}
      </div>
    </main>
  );
}
