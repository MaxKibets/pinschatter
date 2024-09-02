"use server";

import { signIn } from "@/auth";
import { AuthFormSchema, FormState } from "../../common/utils/definitions";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function signinAction(
  state: FormState,
  formData: FormData,
) {
  const validatedFields = AuthFormSchema.omit({ name: true }).safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "",
    };
  }

  // SPIKE! next-auth doesn't make a redirect after successful login
  // https://github.com/nextauthjs/next-auth/issues/10016
  let errorOccurred = false;
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      errorOccurred = true;
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials." };
        default:
          return { message: "Something went wrong." };
      }
    }

    throw error;
  } finally {
    if (!errorOccurred) {
      redirect("/room");
    }
  }
}
