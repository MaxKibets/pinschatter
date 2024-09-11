import React, {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useChannel } from "ably/react";
import ChatBoxLayout from "../components/ChatBoxLayout";
import { useSession } from "next-auth/react";
import { CHANNEL_NAME } from "../utils/channelName";
import MessagesFactory from "./MessagesFactory";
import { Message } from "ably";

export interface MessageInterface extends Message {
  action?: string;
}

export default function ChatBox() {
  const { data: session } = useSession();
  const inputBoxRef = useRef<null | HTMLTextAreaElement>(null);
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const [messageText, setMessageText] = useState<string>("");
  const [receivedMessages, setMessages] = useState<MessageInterface[]>([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const { channel, ably } = useChannel(CHANNEL_NAME, (message) => {
    setMessages((receivedMessages) => [...receivedMessages, message]);
  });

  useEffect(() => {
    channel.presence.subscribe("enter", (message) => {
      setMessages((receivedMessages) => [...receivedMessages, message]);
    });

    channel.presence.subscribe("leave", (message) => {
      setMessages((receivedMessages) => [...receivedMessages, message]);
    });

    return () => {
      channel.presence.unsubscribe();
    };
  }, [channel]);

  useEffect(() => {
    messageEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [receivedMessages]);

  const sendChatMessage = (messageText: string) => {
    channel.publish({
      name: "chat-message",
      data: {
        message: messageText,
        userName: session?.user?.name,
      },
    });
    setMessageText("");
    inputBoxRef?.current?.focus();
  };

  const handleFormSubmission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code !== "Enter" || messageTextIsEmpty) {
      return;
    }

    sendChatMessage(messageText);
    event.preventDefault();
  };

  const messages = receivedMessages.map((message, index) => (
    <MessagesFactory
      key={index}
      action={message.action}
      isMy={message.connectionId === ably.connection.id}
      userName={message.data.userName}
      messageText={message.data.message}
      timestamp={message.timestamp}
    />
  ));

  return (
    <ChatBoxLayout
      messages={messages}
      messageEndRef={messageEndRef}
      inputBoxRef={inputBoxRef}
      handleFormSubmission={handleFormSubmission}
      messageText={messageText}
      handleKeyUp={handleKeyUp}
      setMessageText={setMessageText}
      messageTextIsEmpty={messageTextIsEmpty}
    />
  );
}
