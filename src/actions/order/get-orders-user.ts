"use server";

import { auth } from "@/src/auth";
import { prisma } from "@/src/config/client";

export async function getOrdersByUser() {
  const session = await auth();

  const orders = await prisma.order.findMany({
    where: {
      userId: session?.user.id,
    },
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
