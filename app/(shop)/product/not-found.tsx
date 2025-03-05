import { ArrowLeftIcon, ButtonLink } from "@/src/components";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";

export default function ProductNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 md:px-6 lg:py-20">
      <div className="mx-auto flex max-w-[600px] flex-col items-center justify-center space-y-4 text-center">
        <div className="rounded-full bg-muted p-6">
          <BiSearch className="h-10 w-10" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Producto no encontrado
        </h1>
        <p className="max-w-[500px] md:text-xl/relaxed">
          No pudimos encontrar el producto que estás buscando. Es posible que se
          haya eliminado o que la URL sea incorrecta.
        </p>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Link
            href="/category/men"
            className="bg-slate-800 text-white flex gap-2 items-center hover:bg-slate-700 transition-colors border p-3 rounded-md"
          >
            <ArrowLeftIcon />
            Seguir comprando
          </Link>
          <ButtonLink name="Ir a Inicio" url="/" />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">Recomendaciones para ti</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Link
              href={`/products/product-${i}`}
              key={i}
              className="group block"
            >
              <div className="overflow-hidden rounded-lg border bg-background">
                <div className="aspect-square w-full bg-muted"></div>
                <div className="p-4">
                  <h3 className="font-medium group-hover:underline">
                    Featured Product {i}
                  </h3>
                  <p className="text-sm">$99.99</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
