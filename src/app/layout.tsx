import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "الريادة الوطنية - National Leadership",
  description: "مرحباً بك في موقع الريادة الوطنية - Welcome to National Leadership website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
