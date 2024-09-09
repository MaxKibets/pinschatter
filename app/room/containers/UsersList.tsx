import React from "react";
import clsx from "clsx";
import { usePresence, usePresenceListener } from "ably/react";
import { useSession } from "next-auth/react";
import { CHANNEL_NAME } from "../utils/channelName";

export default function UsersList() {
  const { data: session } = useSession();
  usePresence(CHANNEL_NAME, {
    userName: session?.user?.name,
  });

  const { presenceData } = usePresenceListener(CHANNEL_NAME);

  const users = presenceData.length
    ? presenceData.map(({ data: { userName } }) => (
        <li key={userName}>{userName}</li>
      ))
    : [...Array(5).keys()].map((value, index) => (
        <li
          key={value}
          className={clsx(
            "animate-pulse h-[9px] bg-stone-600 rounded col-span-2",
            index === 0 ? "my-1.5" : "my-3",
          )}
        />
      ));

  return <ul className="min-w-40 p-4 border-r border-stone-600">{users}</ul>;
}
