"use server";

import { prisma } from "@/src/config/client";

export async function getUsers() {
  const users = await prisma.user.findMany();
  if (!users) return [];
  return users;
}
