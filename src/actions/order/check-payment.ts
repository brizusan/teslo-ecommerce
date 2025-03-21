"use server";

import { prisma } from "@/src/config/client";
import { revalidatePath } from "next/cache";

export async function paypalCheckPayment(paypalTransactionId: string) {
  const authToken = await getPaypalBearerToken();
  if (!authToken) {
    return {
      ok: false,
      message: "Error al obtener el token de PayPal",
    };
  }

  const response = await verifyPaypalPayment(paypalTransactionId, authToken);

  if (!response) {
    return {
      ok: false,
      message: "Error al verificar el pago",
    };
  }

  const { status, purchase_units } = response;
  // TODO: invoice id
  const orderId = purchase_units[0].invoice_id;

  // TODO: verificar que el pago se haya realizado con la cuenta de PayPal
  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "El pago no ha sido completado con paypal",
    };
  }
  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });
    // TODO: revalidar path

    revalidatePath(`/orders/${orderId}`);
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: " 500 ,Error el pago no se pudo realizar",
    };
  }
}

async function getPaypalBearerToken() {
  const paypal_client = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const paypal_secret = process.env.PAYPAL_SECRET;
  const oauthUrl = process.env.PAYPAL_OAUTH_URL;

  const base64Token = Buffer.from(
    `${paypal_client}:${paypal_secret}`,
    "utf8"
  ).toString("base64");

  const urlEncoded = new URLSearchParams();
  urlEncoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Basic ${base64Token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlEncoded,
  };

  try {
    const response = await fetch(oauthUrl!, {
      ...requestOptions,
      cache: "no-store",
    });
    const data = await response.json();

    return data.access_token;
  } catch (error) {
    console.log(error);
  }
}

async function verifyPaypalPayment(
  paypalTransactionId: string,
  bearerToken: string
) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  const url = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

  try {
    const response = await fetch(url, {
      ...options,
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
