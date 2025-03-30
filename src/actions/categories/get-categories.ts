"use server";

import { prisma } from "@/src/config/client";

export async function getCategories() {
  const categories = await prisma.category.findMany();

  if (!categories) return [];
  return categories;
}
