"use client";

import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/app/ui/button/components/Button";
import Input from "@/app/ui/input/components/Input";
import { Errors } from "../utils/definitions";

interface AuthFormLayoutInterface {
  title: string;
  buttonText: string;
  withNameField?: boolean;
  formAction: (formData: FormData) => void;
  isPending: boolean;
  errors?: Errors;
  message?: string;
}

export default function AuthFormLayout({
  title,
  buttonText,
  withNameField,
  formAction,
  isPending,
  errors,
  message,
}: AuthFormLayoutInterface) {
  return (
    <form action={formAction}>
      <div className="flex-1 rounded-lg border border-amber-700 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl text-stone-200">{title}</h1>
        <div className="w-full">
          {withNameField && (
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium"
                htmlFor="name"
              >
                Name
              </label>
              <Input
                icon={AtSymbolIcon}
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          {withNameField &&
            errors?.name &&
            errors.name.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              icon={AtSymbolIcon}
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
          </div>
          {errors?.email &&
            errors.email.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <Input
              icon={KeyIcon}
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={6}
            />
          </div>
          {errors?.password &&
            errors.password.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          {buttonText}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div className="flex h-8 items-end space-x-1">
          {message && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{message}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
