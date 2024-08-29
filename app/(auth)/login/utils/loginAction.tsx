import { AuthFormSchema, FormState } from "../../common/utils/definitions";

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

  // Call the provider or db to create a user...
}
