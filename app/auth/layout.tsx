import { auth } from "@/src/auth";
import { titleFont } from "@/src/config/fonts";
import { Metadata } from "next";
import Link from "next/link";
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

  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex justify-center pt-12">
        <Link className="text-3xl" href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span>| Shop</span>
        </Link>
      </div>
      {children}
    </main>
  );
}
