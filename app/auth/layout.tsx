import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth - Teslo Shop",
  description: "Auth , acceso , login , validacon de usuario",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex flex-col min-h-screen">{children}</main>;
}
