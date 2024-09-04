import React, {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useChannel } from "ably/react";
import clsx from "clsx";
import { Message } from "ably";
import ChatBoxLayout from "../components/ChatBoxLayout";

export default function ChatBox() {
  const inputBoxRef = useRef<null | HTMLTextAreaElement>(null);
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const [messageText, setMessageText] = useState<string>("");
  const [receivedMessages, setMessages] = useState<Message[]>([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  useEffect(() => {
    messageEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [receivedMessages]);

  const { channel, ably } = useChannel("pinschatter", (message) => {
    console.log(message);
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });

  const sendChatMessage = (messageText: string) => {
    channel.publish({ name: "chat-message", data: messageText });
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

  // TODO should be refactored
  // Create MessageList component that should render the appropriate message component
  const messages = receivedMessages.map((message, index) => (
    <div
      key={index}
      className={clsx(
        "border rounded-lg p-2 mb-2 bg-stone-800",
        message.connectionId === ably.connection.id
          ? "self-end border-amber-700"
          : "self-start border-stone-600",
      )}
    >
      {message.data}
    </div>
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
