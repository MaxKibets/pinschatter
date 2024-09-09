import React from "react";
import ChatHeader from "./components/ChatHeader";

export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 flex flex-col h-screen">
      <ChatHeader />
      <main className="flex border rounded-lg border-stone-600 grow max-w-screen-md w-full m-auto overflow-hidden">
        {children}
      </main>
    </div>
  );
}
