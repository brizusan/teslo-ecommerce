"use client";
import { CheckoutGrid, CheckoutSummary, Title } from "@/src/components";
import { useCartStore } from "@/src/store";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function CheckoutPage() {
  const cart = useCartStore((state) => state.cart);

  if (cart.length === 0) return notFound();

  return (
    <section className=" max-w-[1024px] mx-auto w-full px-10 ">
      <Title title="Verificar compra" subtitle="Confirma tu compra" />
      <Link
        href="/cart"
        className="underline underline-offset-4 decoration-slate-800 hover:tracking-widest transition-all"
      >
        Editar Carrito
      </Link>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-10 my-12">
        <CheckoutGrid cart={cart} />

        <div className="col-span-2 w-full">
          <CheckoutSummary />
        </div>
      </section>
    </section>
  );
}
