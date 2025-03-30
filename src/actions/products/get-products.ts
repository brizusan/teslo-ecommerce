"use server";

import { prisma } from "@/src/config/client";

type ProductsPros = {
  take: number;
  skip?: number;
};

export async function getProducts({ take, skip }: ProductsPros) {
  const [resProducts, totalProducts] = await Promise.all([
    prisma.product.findMany({
      take,
      skip,
      include: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },
      orderBy: {
        inStock: "asc",
      },
    }),
    prisma.product.count(),
  ]);

  return {
    products: resProducts.map((product) => ({
      ...product,
      images: product.ProductImage.map((image) => image.url),
    })),
    totalPages: Math.ceil(totalProducts / take),
  };
}
