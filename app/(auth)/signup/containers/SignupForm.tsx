"use client";

import { useActionState } from 'react';
import AuthFormLayout from '../../common/components/AuthFormLayout';
import signupAction from '../utils/signupAction';

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(
    signupAction,
    undefined,
  );

  console.log(state);

  return (
    <AuthFormLayout
      title={'Please register to continue'}
      buttonText={'Register'}
      formAction={formAction}
      isPending={isPending}
      errors={state?.errors}
      withNameField
    />
  );
}
