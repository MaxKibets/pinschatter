"use client";

import React, { useActionState } from "react";
import AuthFormLayout from "../../common/components/AuthFormLayout";
import loginAction from "../utils/loginAction";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, undefined);

  return (
    <AuthFormLayout
      title={"Please log in to continue"}
      buttonText={"Log in"}
      formAction={formAction}
      isPending={isPending}
      errors={state?.errors}
      message={state?.message}
    />
  );
}
