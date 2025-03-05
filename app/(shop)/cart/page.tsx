import { CartItem, CartSummary, Title } from "@/src/components";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function CartPage() {
  const cart = [];

  if (cart.length === 0) notFound();
  return (
    <section className="px-10 max-w-[960px] mx-auto ">
      <Title
        title="Carrito de compras"
        subtitle="Agrega productos a tu carrito"
      />
      <Link
        href="/category/men"
        className="underline underline-offset-4 decoration-slate-800 hover:tracking-widest transition-all"
      >
        Seguir comprando
      </Link>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 my-12">
        <div className="col-span-2 grid grid-cols-1 gap-2">
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>

        <div className="col-span-1">
          <CartSummary />
        </div>
      </section>
    </section>
  );
}
