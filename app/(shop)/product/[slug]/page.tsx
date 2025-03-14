export const revalidate = 6048000; // 7dias
import {
  ProductStock,
  SliderProduct,
  SliderProductMobile,
} from "@/src/components";
import { prisma } from "@/src/config/client";
import { titleFont } from "@/src/config/fonts";
import { formatCurrency } from "@/src/utils";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "../components/AddToCart";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProdyctBySlug(slug);

  return {
    title: {
      template: `%s ${product.title}  `,
      default: `${product.title} `,
    },
    description: `${product.description} ?? 'breve descripcion'`,
    openGraph: {
      title: `Producto - ${product.title} ?? 'producto'`,
      description: `${product.description} ?? 'breve descripcion'`,
    },
  };
}

async function getProdyctBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    include: {
      ProductImage: {
        select: {
          url: true,
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

export default async function ProductBySlug({ params }: Props) {
  const { slug } = await params;
  const product = await getProdyctBySlug(slug);

  return (
    <>
      <section className="my-8 mb-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 max-w-[1280px] lg:mx-auto">
        {/* SlideShow */}
        <div className="col-span-1 md:col-span-2 bg-blue-50/50 rounded-lg ">
          <div className="md:block hidden ">
            <SliderProduct images={product.images} title={product.title} />
          </div>
          <div className="block  md:hidden ">
            <SliderProductMobile
              images={product.images}
              title={product.title}
            />
          </div>
        </div>
        {/* Product Info */}
        <div className="col-span-1 px-4  space-y-3">
          <ProductStock slug={slug} />
          <h1
            className={`${titleFont.className} antialiased font-bold text-xl`}
          >
            {product.title}
          </h1>
          <p className="text-lg">{formatCurrency(product.price)}</p>

          {/* CTA - Agregar al carrito */}
          <AddToCart product={product} />
          {/* Descripcion */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Descripcion</h3>
            <p className="text-pretty">{product.description}</p>
          </div>
        </div>
      </section>
    </>
  );
}
