import { CheckoutItem, CheckoutSummary, Title } from "@/src/components";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <section className="px-10 max-w-[960px] mx-auto ">
      <Title title="Verificar compra" subtitle="Confirma tu compra" />
      <Link
        href="/cart"
        className="underline underline-offset-4 decoration-slate-800 hover:tracking-widest transition-all"
      >
        Editar Carrito
      </Link>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-10 my-12">
        <div className="col-span-2 grid grid-cols-1 gap-2">
          <CheckoutItem />
          <CheckoutItem />
          <CheckoutItem />
          <CheckoutItem />
        </div>

        <div className="col-span-2 w-full">
          <CheckoutSummary />
        </div>
      </section>
    </section>
  );
}
