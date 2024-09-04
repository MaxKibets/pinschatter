import React from "react";
import { Metadata } from "next/types";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import("./containers/Chat"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Chat room",
};

export default function RoomPage() {
  return <Chat />;
}
