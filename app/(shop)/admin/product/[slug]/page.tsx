import { getCategories } from "@/src/actions";
import { Title } from "@/src/components";
import { prisma } from "@/src/config/client";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ProductForm } from "../components/ProductForm";

type Props = {
  params: Promise<{ slug: string }>;
};

export const metadata: Metadata = {
  title: {
    template: "%s - Productos",
    default: "Producto",
  },
  description:
    "Gestion de productos , ingresos , egresos , stock de products , agregados , eliminados",
};

async function getProdyctBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    include: {
      ProductImage: {
        select: {
          url: true,
          id: true,
        },
      },
      category: {
        select: {
          id: true,
        },
      },
    },
    where: {
      slug,
    },
  });

  if (!product) notFound();

  return {
    ...product,
    images: product?.ProductImage.map((item) => item.url),
  };
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const [product, categories] = await Promise.all([
    getProdyctBySlug(slug),
    getCategories(),
  ]);

  if (!slug) return notFound();
  if (!product) redirect(`/admin/products`);

  return (
    <section className="px-10">
      <Title title="Actualizar Producto" subtitle="Informacion del producto" />

      <ProductForm product={product} categories={categories} />
    </section>
  );
}
