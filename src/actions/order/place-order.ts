"use server";

import { auth } from "@/src/auth";
import { prisma } from "@/src/config/client";
import { Size } from "@/src/interfaces";
import { Address } from "@/src/schemas";

type AddressOrder = Omit<Address, "rememberAdress">;

type Props = {
  productsOrder: {
    id: string;
    quantity: number;
    size: Size;
  }[];
  address: AddressOrder;
};

export async function placeOrder({ productsOrder, address }: Props) {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return {
      ok: false,
      message: "No hay sesión de usuario",
    };
  }

  // tomar la informacion de los products
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsOrder.map(({ id }) => id),
      },
    },
  });

  // tomar el total de productos enviados
  const itemsInOrder = productsOrder.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const cart = {
    itemsInOrder,
    total: 0,
    subtotal: 0,
    tax: 0,
  };

  for (const item of productsOrder) {
    const product = products.find((p) => p.id === item.id);
    if (!product) throw new Error(`Producto no encontrado ${item.id}`);
    cart.subtotal += product.price * item.quantity;
    cart.tax = cart.subtotal * 0.18;
    cart.total = cart.subtotal + cart.tax + 4.99;
  }

  // TODO : GENERAR LA TRANSACCIONES

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. actualizar el stock de los productos

      const updatedProducts = products.map(async (item) => {
        const productQuantity = productsOrder
          .filter((p) => p.id === item.id)
          .reduce((acc, p) => acc + p.quantity, 0);

        // validar si no ya no tenemos Stock
        if (productQuantity === 0) {
          throw new Error(`Producto no disponible ${item.id}`);
        }

        return tx.product.update({
          where: {
            id: item.id,
          },
          data: {
            inStock: { decrement: productQuantity },
          },
        });
      });

      const updatedProductsQuantity = await Promise.all(updatedProducts);

      // verificar que se hayan actualizado los productos
      // y que tenga exixtencia
      updatedProductsQuantity.forEach((item) => {
        if (item.inStock < 0) {
          throw new Error(` ${item.title} - no tiene stock disponible`);
        }
      });

      // 2. Crear la orden - Encabezado - Detalle
      const order = await tx.order.create({
        data: {
          userId,
          subTotal: cart.subtotal,
          tax: cart.tax,
          total: cart.total,
          isPaid: false,
          itemsInOrder: cart.itemsInOrder,

          OrderItem: {
            createMany: {
              data: productsOrder.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
                size: item.size,
                price: products.find((p) => p.id === item.id)!.price,
              })),
            },
          },
        },
      });

      // 3. Crear la direccion de la orden

      const { country, name, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          firstName: name,
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });
      return {
        order,
        orderAddress,
        updatedProductsQuantity,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error?.message,
    };
  }

  // TODO : GRABAR EN PRISMA LA ORDEN
}
