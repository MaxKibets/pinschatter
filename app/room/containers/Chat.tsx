"use client";

import React from "react";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import ChatBox from "./ChatBox";
import UsersList from "./UsersList";
import { CHANNEL_NAME } from "../utils/channelName";

export default function Chat() {
  const client = new Ably.Realtime({ authUrl: "/api" });

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={CHANNEL_NAME}>
        <UsersList />
        <ChatBox />
      </ChannelProvider>
    </AblyProvider>
  );
}
