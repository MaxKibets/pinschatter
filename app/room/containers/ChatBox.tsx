import React, {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useChannel } from "ably/react";
import { Button } from "@/app/ui";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Message } from "ably";

export default function ChatBox() {
  const inputBox = useRef<null | HTMLTextAreaElement>(null);
  const messageEnd = useRef<null | HTMLDivElement>(null);
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<Message[]>([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  useEffect(() => {
    messageEnd?.current?.scrollIntoView({ behavior: "smooth" });
  });

  const { channel, ably } = useChannel("pinschatter", (message) => {
    console.log(message);
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });

  const sendChatMessage = (messageText: string) => {
    channel.publish({ name: "chat-message", data: messageText });
    setMessageText("");
    inputBox?.current?.focus();
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
    <div className="grow flex flex-col">
      <div className="flex flex-col grow p-2 border-b border-stone-600">
        {messages}
        <div ref={messageEnd}></div>
      </div>
      <form onSubmit={handleFormSubmission} className="p-2  flex">
        <textarea
          ref={inputBox}
          value={messageText}
          placeholder="Type a message..."
          onChange={(e) => setMessageText(e.target.value)}
          onKeyUp={handleKeyUp}
          rows={2}
          className="mr-2 grow outline-none bg-transparent placeholder:text-stone-500 text-sm"
        ></textarea>
        <Button
          icon={PaperAirplaneIcon}
          type="submit"
          disabled={messageTextIsEmpty}
        />
      </form>
    </div>
  );
}
