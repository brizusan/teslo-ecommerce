"use server";
import { prisma } from "@/src/config/client";

export async function removeAddress(userId: string) {
  const store = await prisma.userAdress.findUnique({
    where: {
      userId,
    },
  });

  if (!store) return { ok: false, message: "No se encontro la direccion" };

  await prisma.userAdress.delete({
    where: {
      id: store.id,
    },
  });

  return { ok: true, message: "Direccion eliminada" };
}
