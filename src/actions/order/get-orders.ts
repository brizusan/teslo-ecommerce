"use server";

import { prisma } from "@/src/config/client";

export async function getOrders() {
  const orders = await prisma.order.findMany({
    include: {
      OrderAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  if (!orders) return [];
  return orders;
}
