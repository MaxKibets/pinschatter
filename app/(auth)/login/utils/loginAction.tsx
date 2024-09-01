"use server";

import { signIn } from "@/auth";
import { AuthFormSchema, FormState } from "../../common/utils/definitions";
import { AuthError } from "next-auth";

export default async function loginAction(
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
    };
  }

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials." };
        default:
          return { message: "Something went wrong." };
      }
    }

    throw error;
  }
}
