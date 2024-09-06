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
import { useSession } from "next-auth/react";

export default function ChatBox() {
  const { data: session } = useSession();
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

  // TODO should be refactored
  // Create MessageList component that should render the appropriate message component
  const messages = receivedMessages.map((message, index) => (
    <div
      key={index}
      className={clsx(
        "border rounded-lg py-2 px-3 mb-2 bg-stone-800 flex flex-col",
        message.connectionId === ably.connection.id
          ? "self-end border-amber-700"
          : "self-start border-stone-600",
      )}
    >
      <div className="text-xs text-stone-600 mt-[-4px]">
        {message.data.userName}
      </div>
      {message.data.message}
      <div className="text-xs text-stone-600 self-end mb-[-4px]">
        {new Date(message.timestamp!).toLocaleDateString("en-US")}
      </div>
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
