"use server";

import { sql } from "@vercel/postgres";
import { AuthFormSchema, FormState } from "../../common/utils/definitions";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import getUser from "../../common/utils/getUser";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function signupAction(
  state: FormState,
  formData: FormData,
) {
  const validatedFields = AuthFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  const user = await getUser(email, name);

  if (user) {
    if (name === user.name) {
      return {
        errors: {
          name: [`The name '${name}' is already in use`],
        },
      };
    }

    return {
      errors: {
        email: [`The email '${email}' is already in use`],
      },
    };
  }

  const hashedPassword = await bcrypt.hashSync(password, 10);
  const id = crypto.randomUUID();

  try {
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${id}, ${name}, ${email}, ${hashedPassword})
      ON CONFLICT (id) DO NOTHING;
    `;
  } catch (error) {
    return { message: "Database Error: Failed to register.", error };
  }

  // SPIKE! next-auth doesn't make a redirect after successful login
  // https://github.com/nextauthjs/next-auth/issues/10016
  let errorOccurred = false;
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      errorOccurred = true;
      return { message: "Something went wrong." };
    }

    throw error;
  } finally {
    if (!errorOccurred) {
      redirect("/room");
    }
  }
}
