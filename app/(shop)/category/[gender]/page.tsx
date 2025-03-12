export const revalidate = 604800016;
import {
  Pagination,
  ProductGrid,
  ProductGridEmpty,
  Title,
} from "@/src/components";
import { Category } from "@/src/interfaces";
import { isValidPage } from "@/src/utils";
import { Gender } from "@prisma/client";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { prisma } from "../../../../src/config/client";

type Props = {
  params: Promise<{ gender: Category }>;
  searchParams: Promise<{ page: string }>;
};

export const metadata: Metadata = {
  title: {
    template: "%s - Categories ",
    default: "Categories ",
  },
  description: "Browse all product categories available at Teslo Shop.",
  openGraph: {
    title: "Categories - Teslo Shop",
    description: "Explore a variety of product categories in our store.",
  },
};

const categoryMap: Record<Category, string> = {
  men: "hombres",
  women: "mujeres",
  kid: "niños",
  unisex: "unisex",
};

async function getProductsWithCategory(
  gender: string,
  take: number,
  page: number
) {
  const [resProducts, totalProducts] = await Promise.all([
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
      where: {
        gender: gender as Gender,
      },
    }),
    prisma.product.count({
      where: {
        gender: gender as Gender,
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

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const { page } = await searchParams;
  const pageInt = page ? Number(page) : 1;
  const take = 9;

  const { products: productsByCategory, totalPages } =
    await getProductsWithCategory(gender, take, pageInt);

  if (!productsByCategory) return notFound();
  if (!isValidPage(pageInt)) redirect(`/category/${gender}?page=1`);

  return (
    <section className="px-10">
      <Title
        title="Categoría"
        subtitle={`Todos los productos , accesorios y más de ${categoryMap[gender]}`}
        className="mb-2"
      />
      {productsByCategory.length > 0 ? (
        <>
          <ProductGrid products={productsByCategory} />
          <Pagination totalPages={totalPages} currentPage={pageInt} />
        </>
      ) : (
        <ProductGridEmpty
          title={`No hay productos en la categoría ${categoryMap[gender]}`}
          description={`Lo sentimos, no pudimos encontrar productos en la categoría ${categoryMap[gender]}. Puede que haya sido movida o eliminada.`}
        />
      )}
    </section>
  );
}
