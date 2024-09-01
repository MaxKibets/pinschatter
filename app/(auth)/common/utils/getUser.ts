import { sql } from "@vercel/postgres";
import { User } from "./definitions";

export default async function getUser(
  email: string,
  name: string = "",
): Promise<User | undefined> {
  try {
    const user =
      await sql<User>`SELECT * FROM users WHERE email=${email} OR name=${name}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
