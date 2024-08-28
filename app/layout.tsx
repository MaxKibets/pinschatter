import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({weight: ["100", "300", "500", "900"], subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Pinschatter | barking chat",
  description: "Pinschatter is a chat where you can freely bark at anyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
