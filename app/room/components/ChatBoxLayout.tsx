import { Button } from "@/app/ui";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import React, {
  Dispatch,
  FormEventHandler,
  KeyboardEventHandler,
  ReactNode,
  RefObject,
  SetStateAction,
} from "react";

interface ChatBoxLayoutInterface {
  messages: ReactNode[];
  messageEndRef: RefObject<null | HTMLDivElement>;
  inputBoxRef: RefObject<null | HTMLTextAreaElement>;
  handleFormSubmission: FormEventHandler<HTMLFormElement>;
  messageText: string;
  handleKeyUp: KeyboardEventHandler<HTMLTextAreaElement>;
  setMessageText: Dispatch<SetStateAction<string>>;
  messageTextIsEmpty: boolean;
}

export default function ChatBoxLayout({
  messages,
  messageEndRef,
  inputBoxRef,
  handleFormSubmission,
  messageText,
  handleKeyUp,
  setMessageText,
  messageTextIsEmpty,
}: ChatBoxLayoutInterface) {
  return (
    <div className="grow flex flex-col">
      <div className="flex flex-col p-2 border-b border-stone-600 overflow-y-auto mt-auto">
        {messages}
        <div ref={messageEndRef}></div>
      </div>
      <form onSubmit={handleFormSubmission} className="p-2 flex">
        <textarea
          ref={inputBoxRef}
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
