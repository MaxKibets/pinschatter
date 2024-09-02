"use client";

import React, { useActionState } from "react";
import AuthFormLayout from "../../common/components/AuthFormLayout";
import signinAction from "../utils/signinAction";

export default function SigninForm() {
  const [state, formAction, isPending] = useActionState(
    signinAction,
    undefined,
  );

  return (
    <AuthFormLayout
      title="Please log in to continue"
      buttonText="Log in"
      subText="Don't have an account?"
      linkText="Register now!"
      linkHref="/signup"
      formAction={formAction}
      isPending={isPending}
      errors={state?.errors}
      message={state?.message}
    />
  );
}
