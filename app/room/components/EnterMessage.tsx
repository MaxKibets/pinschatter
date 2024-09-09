import React from "react";

export default function EnterMessage({ userName }: { userName: string }) {
  return (
    <div className="mt-2 text-stone-600 text-xs self-center">
      {userName} entered the chat room
    </div>
  );
}
