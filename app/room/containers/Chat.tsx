"use client";

import React from "react";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import ChatBox from "./ChatBox";

export default function Chat() {
  const client = new Ably.Realtime({ authUrl: "/api" });

  return (
    <main className="flex border rounded-lg border-stone-600 grow max-w-screen-md w-full m-auto">
      <AblyProvider client={client}>
        <ChannelProvider channelName="pinschatter">
          <div className="p-4 border-r border-stone-600">users</div>
          <ChatBox />
        </ChannelProvider>
      </AblyProvider>
    </main>
  );
}
