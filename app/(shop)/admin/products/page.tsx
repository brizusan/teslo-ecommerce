import { getProducts } from "@/src/actions";
import { Pagination, ProductImage, Title } from "@/src/components";
import { formatCurrency } from "@/src/utils";
import clsx from "clsx";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ page: string }>;
};

export const metadata: Metadata = {
  title: {
    template: "%s - Products",
    default: "Admin - Products",
  },
  description:
    "Gestion de productos , ingresos , egresos , stock de products , agregados , eliminados",
};

export default async function ProductsPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageInt = page ? Number(page) : 1;
  const take = 10;
  const skip = (pageInt - 1) * take;

  const { products, totalPages } = await getProducts({ take, skip });

  const isEmpty = products.length === 0;

  return (
    <>
      <section className="px-10">
        <Title
          title="Gestion de Productos | Admin"
          subtitle="A continuacion tenemos todas los productos registrados hasta el momento"
        />

        <div className="flex justify-end my-6">
          <Link
            href={`/admin/product/new`}
            className="bg-blue-500 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-600 hover:transition-colors"
          >
            Nuevo Producto
          </Link>
        </div>

        {isEmpty && (
          <div className="mt-20  min-h-[20vh] lg:min-h-[40vh]">
            <p className="text-center text-2xl">
              No tenemos productos para mostrar
            </p>
          </div>
        )}
        {!isEmpty && (
          <div className="my-10 max-w-[1380px] mx-auto min-h-[40vh]">
            <table className="min-w-full border">
              <thead className="bg-gray-200 border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Imagen
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Nombre Producto
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    Precio
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    Genero
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    Inventario
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Opciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="bg-white border-b transition  duration-300 ease-in-out hover:bg-gray-100"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link
                        href={`/product/${product.slug}`}
                        className="hover:underline"
                      >
                        <ProductImage
                          src={product.ProductImage[0]?.url}
                          alt={product.title}
                          width={60}
                          height={60}
                          className="rounded-md"
                        />
                      </Link>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {product.title}{" "}
                    </td>
                    <td className="text-sm text-gray-900 font-semibold  px-6 py-4 whitespace-nowrap">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {product.gender}{" "}
                    </td>
                    <td className="text-center  text-sm  text-gray-900 font-light  whitespace-nowrap">
                      <span
                        className={clsx("mx-2 font-medium ", {
                          "text-blue-700 bg-blue-100 px-5 py-0.5 rounded-lg":
                            product.inStock,
                          "text-red-600 decoration-red-300 decoration-2 line-through":
                            !product.inStock,
                        })}
                      >
                        stock
                      </span>
                    </td>
                    <td className="text-sm text-gray-900 text-center font-light px-6 ">
                      <Link
                        href={`/admin/product/${product.slug}`}
                        className="hover:underline font-semibold text-blue-500 text-center"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Pagination totalPages={totalPages} currentPage={pageInt} />
    </>
  );
}
