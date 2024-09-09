import React from "react";

export default function LeaveMessage({ userName }: { userName: string }) {
  return (
    <div className="mt-2 text-stone-600 text-xs self-center">
      {userName} left the chat room
    </div>
  );
}
