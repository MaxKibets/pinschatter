import React from "react";
import { signOut } from "@/auth";
import { Button } from "@/app/ui/button/components/Button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Room() {
  return (
    <main>
      <header className="flex p-4">
        <form
          className="ml-auto"
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <Button filled={false} type="submit">
            Sign out <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          </Button>
        </form>
      </header>
    </main>
  );
}
