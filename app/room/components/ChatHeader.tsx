import signoutAction from "@/app/(auth)/common/utils/signoutAction";
import { Button } from "@/app/ui";
import Paw from "@/public/Paw";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function ChatHeader() {
  return (
    <header className="flex mb-4">
      <Paw className="w-10 h-auto" />
      <form className="ml-auto" action={signoutAction}>
        <Button icon={ArrowRightStartOnRectangleIcon} type="submit" />
      </form>
    </header>
  );
}
