import { Metadata } from "next";
import SigninForm from "./containers/SigninForm";

export const metadata: Metadata = {
  title: "Sing in page",
};

export default function SinginPage() {
  return <SigninForm />;
}
