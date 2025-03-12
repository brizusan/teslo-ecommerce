"use server";

import { prisma } from "@/src/config/client";

export async function getStock(slug: string) {
  const product = await prisma.product.findUnique({
    select: {
      inStock: true,
    },
    where: {
      slug,
    },
  });

  if (!product) return { stock: 0 };

  return { stock: product.inStock };
}
