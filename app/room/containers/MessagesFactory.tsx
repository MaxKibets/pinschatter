import React from "react";
import TextMessage, { TextMessageInterface } from "../components/TextMessage";
import EnterMessage from "../components/EnterMessage";
import LeaveMessage from "../components/LeaveMessage";

interface MessagesFactoryInterface extends TextMessageInterface {
  action?: string;
}

export default function MessagesFactory({
  action,
  userName,
  ...props
}: MessagesFactoryInterface) {
  switch (action) {
    case "enter":
      return <EnterMessage userName={userName} />;
    case "leave":
      return <LeaveMessage userName={userName} />;
    default:
      return <TextMessage userName={userName} {...props} />;
  }
}
