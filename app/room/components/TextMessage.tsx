import clsx from "clsx";
import React from "react";

export interface TextMessageInterface {
  isMy: boolean;
  userName: string;
  messageText: string;
  timestamp?: number;
}

export default function TextMessage({
  isMy,
  userName,
  messageText,
  timestamp,
}: TextMessageInterface) {
  return (
    <div
      className={clsx(
        "border rounded-lg py-2 px-3 mt-2 bg-stone-800 flex flex-col",
        isMy ? "self-end border-amber-700" : "self-start border-stone-600",
      )}
    >
      <div className="text-xs text-stone-600 mt-[-4px]">{userName}</div>
      {messageText}
      <div className="text-xs text-stone-600 self-end mb-[-4px]">
        {new Date(timestamp!).toLocaleDateString("en-US")}
      </div>
    </div>
  );
}
