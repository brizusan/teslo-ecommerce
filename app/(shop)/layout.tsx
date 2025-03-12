import { Footer, SideBar, TopMenu } from "@/src/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "Tienda , accesorios y más",
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col  min-h-screen">
      <TopMenu />
      <SideBar />
      <section>{children}</section>
      <Footer />
    </main>
  );
}
