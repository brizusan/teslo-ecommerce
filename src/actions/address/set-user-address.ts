"use server";

import { prisma } from "@/src/config/client";
import { Address } from "@/src/schemas";

export async function setUserAddress(data: Address, userId: string) {
  try {
    const address = await createOrUpdateAddress(data, userId);

    return {
      address,
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Error al actualizar la dirección",
      ok: false,
    };
  }
}

async function createOrUpdateAddress(data: Address, userId: string) {
  try {
    const storagedAddress = await prisma.userAdress.findUnique({
      where: {
        userId,
      },
    });

    const addressData = {
      address: data.address,
      address2: data.address2,
      city: data.city,
      countryID: data.country,
      name: data.name,
      lastName: data.lastName,
      postalCode: data.postalCode,
      phone: data.phone,
      userId,
    };

    if (!storagedAddress) {
      const newAddress = await prisma.userAdress.create({ data: addressData });
      return newAddress;
    }

    const updatedAddress = await prisma.userAdress.update({
      where: {
        id: storagedAddress.id,
      },
      data: addressData,
    });
    return updatedAddress;
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar la dirección");
  }
}
