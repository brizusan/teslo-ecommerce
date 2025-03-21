"use server";

import { prisma } from "@/src/config/client";

export async function setTransactionId(orderId: string, transactionId: string) {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    });

    if (!order) return { ok: false, message: "No se encontro la orden" };
    return {
      ok: true,
      transactionId: order.transactionId,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al crear la transaccion de pago",
    };
  }
}
