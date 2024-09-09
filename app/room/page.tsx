import React from "react";
import { Metadata } from "next/types";
import dynamic from "next/dynamic";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Spinner } from "@/app/ui";

const Chat = dynamic(() => import("./containers/Chat"), {
  ssr: false,
  loading: () => <Spinner className="self-center grow" />,
});

export const metadata: Metadata = {
  title: "Chat room",
};

export default async function RoomPage() {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <Chat />
    </SessionProvider>
  );
}
