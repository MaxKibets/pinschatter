import React from "react";
import { signOut } from "@/auth";
import { Button } from "@/app/ui";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Paw from "@/public/Paw";

export default function Room() {
  return (
    <div>
      <header className="flex p-4">
        <Paw className="w-10 h-auto" />
        <form
          className="ml-auto"
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <Button icon={ArrowRightStartOnRectangleIcon} type="submit" />
        </form>
      </header>
    </div>
  );
}
