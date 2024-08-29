import { Metadata } from "next";
import SignupForm from "./containers/SignupForm";

export const metadata: Metadata = {
  title: "Registration page",
};

export default function LoginPage() {
  return <SignupForm />;
}
