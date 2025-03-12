export const revalidate = 604800016;
import {
  Pagination,
  ProductGrid,
  ProductGridEmpty,
  Title,
} from "@/src/components";
import { isValidPage } from "@/src/utils";
import { redirect } from "next/navigation";
import { prisma } from "../../src/config/client";
// import { initialData } from "@/src/seed/seed";

// const products = initialData.products;

async function getProducts(page: number, take: number) {
  const [totalProducts, resProducts] = await Promise.all([
    prisma.product.count(),
    prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },
    }),
  ]);

  return {
    products: resProducts.map((product) => ({
      ...product,
      images: product.ProductImage.map((image) => image.url),
    })),
    totalPages: Math.ceil(totalProducts / take),
  };
}

export type ProductsWithImages = Awaited<ReturnType<typeof getProducts>>;

type Props = {
  searchParams: Promise<{ page: string }>;
};

export default async function HomePage({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageInt = page ? Number(page) : 1;
  const take = 12;
  const { products, totalPages } = (await getProducts(
    pageInt,
    take
  )) as ProductsWithImages;

  if (!isValidPage(pageInt)) redirect("/?page=1");

  const isEmpty = products.length === 0;

  return (
    <section className="px-10">
      <Title
        title="Tienda"
        subtitle="Todos los productos , accesorios y más"
        className="mb-2"
      />

      {isEmpty ? (
        <ProductGridEmpty
          title="Productos"
          description="No tenemos productos para mostrar"
        />
      ) : (
        <ProductGrid products={products} />
      )}

      {!isEmpty && <Pagination totalPages={totalPages} currentPage={pageInt} />}
    </section>
  );
}
