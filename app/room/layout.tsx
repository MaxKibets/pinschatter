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
      {children}
    </div>
  );
}
