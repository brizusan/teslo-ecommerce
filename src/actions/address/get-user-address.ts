"use server";

import { prisma } from "@/src/config/client";

export async function getUserAddress(userId: string) {
  const address = await prisma.userAdress.findUnique({
    where: {
      userId,
    },
  });

  if (!address) return null;

  return {
    ...address,
    country: address.countryID,
    address2: address.address2 ? address.address2 : "",
    rememberAdress: false,
  };
}
