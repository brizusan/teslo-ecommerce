import { ButtonLink } from "@/src/components";
import { FaExclamation } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { categories } from "../category/not-found";

export default function CheckoutNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center space-y-8">
        <div className="relative">
          <div className="absolute -top-1 -right-1 flex h-6 w-6 bg-red-400 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
            <FaExclamation className="text-red-100 " />
          </div>
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <FaCartShopping className="h-12 w-12" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Carrito de Compras Vacio
          </h1>
          <p className="text-pretty">
            No hay productos en tu carrito de compras. Puedes seguir comprando
            en nuestra tienda.
          </p>
        </div>

        <div className="w-full space-y-4 pt-6">
          <h2 className="text-xl font-semibold">Categorías populares</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {categories.map((cat) => (
              <ButtonLink key={cat.id} {...cat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
