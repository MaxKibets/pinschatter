import { signOut } from "@/auth";

export default async function signoutAction() {
  "use server";
  await signOut({ redirectTo: "/" });
}
