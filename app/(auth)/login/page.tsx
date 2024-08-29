import { Metadata } from "next";
import LoginForm from "./containers/LoginForm";

export const metadata: Metadata = {
  title: "Login page",
};

export default function LoginPage() {
  return <LoginForm />;
}
