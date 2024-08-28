import { AuthFormSchema, FormState } from '../../common/utils/definitions';
import bcrypt from 'bcrypt';

export default async function signupAction(state: FormState, formData: FormData) {
  const validatedFields = AuthFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
 
  const { name, email, password } = validatedFields.data

  const hashedPassword = await bcrypt.hash(password, 10)
}