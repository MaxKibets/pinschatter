import { Metadata } from "next";
import SigninForm from "./containers/SigninForm";

export const metadata: Metadata = {
  title: "Sign in page",
};

export default function SigninPage() {
  return <SigninForm />;
}
