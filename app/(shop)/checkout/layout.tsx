import { auth } from "@/src/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  description: "Tienda , accesorios y más  , checkout",
};

export default async function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");
  return <main className="flex flex-col  min-h-screen">{children}</main>;
}
