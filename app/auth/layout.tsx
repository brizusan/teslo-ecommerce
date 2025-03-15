import { auth } from "@/src/auth.config";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Auth - Teslo Shop",
  description: "Auth , acceso , login , validacon de usuario",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session?.user) return redirect("/");

  return <main className="flex flex-col min-h-screen">{children}</main>;
}
