import { ButtonLink } from "@/src/components";
import Link from "next/link";
import { BiHome, BiShoppingBag } from "react-icons/bi";
import { FaExclamation } from "react-icons/fa";

export const categories = [
  { id: 1, name: "mujeres", url: "/category/women", slug: "women" },
  { id: 2, name: "hombres", url: "/category/men", slug: "men" },
  { id: 3, name: "niños", url: "/category/kid", slug: "kid" },
];

export default function CategoryNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center space-y-8">
        <div className="relative">
          <div className="absolute -top-1 -right-1 flex h-6 w-6 bg-red-400 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
            <FaExclamation className="text-red-100 " />
          </div>
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <BiShoppingBag className="h-12 w-12" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Categoría no encontrada
          </h1>
          <p className="text-pretty">
            Lo sentimos, no pudimos encontrar la categoría que estás buscando.
            Puede que haya sido movida o eliminada.
          </p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            <button className="hover:bg-gray-100 transition-colors border p-3 rounded-md">
              <Link
                className="flex flex-row-reverse gap-2 items-center"
                href="/"
              >
                <BiHome className="mr-2 h-4 w-4" />
                Inicio
              </Link>
            </button>
            <button className="bg-slate-800 text-white hover:bg-slate-700 transition-colors border p-3 rounded-md">
              <Link
                className="flex flex-row-reverse gap-2 items-center"
                href="/cart"
              >
                <BiHome className="mr-2 h-4 w-4" />
                Todos los Productos
              </Link>
            </button>
          </div>
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
