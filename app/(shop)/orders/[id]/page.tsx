import { CheckoutItem, PaypalButton, Title } from "@/src/components";
import { prisma } from "@/src/config/client";
import { formatCurrency } from "@/src/utils";
import clsx from "clsx";
import { notFound } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

type Props = {
  params: Promise<{ id: string }>;
};

async function getOrder(id: string) {
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      OrderAddress: {
        include: {
          country: true,
        },
      },
      OrderItem: {
        include: {
          product: {
            select: {
              title: true,
              ProductImage: {
                select: {
                  url: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!order) return notFound();
  return order;
}

export type OrderWithItems = Awaited<ReturnType<typeof getOrder>>;

export default async function OrderDetailsPage({ params }: Props) {
  const { id } = await params;
  const order = (await getOrder(id)) as OrderWithItems;

  return (
    <section className="px-10 max-w-[960px] mx-auto ">
      <Title
        title="Orden de Compra"
        subtitle={`Confirma tu compra - #${order.id.slice(0, 6)}`}
      />

      <div
        className={clsx(
          "flex gap-4 items-center w-1/2 rounded-lg text-xs font-semibold py-1 pl-8",
          {
            "bg-green-200 text-green-800": order.isPaid,
            "bg-red-200 text-red-800": !order.isPaid,
          }
        )}
      >
        <IoCardOutline size={30} />
        <p>Orden - {order.isPaid ? "Pagada" : "Pendiente"}</p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-10 my-12">
        <div className="col-span-2 grid grid-cols-1 gap-2 self-start">
          {order.OrderItem.map((item) => (
            <CheckoutItem key={item.id} productOrder={item} />
          ))}
        </div>

        <div className="col-span-2 w-full">
          <article className="bg-white shadow w-full space-y-4 p-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Direccion de envio</h3>
              <p className="text-gray-700 font-medium">
                {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
              </p>
              <p>{order.OrderAddress?.address}</p>
              <p>
                {order.OrderAddress?.address2
                  ? order.OrderAddress?.address2
                  : ""}{" "}
                - {order.OrderAddress?.city}
              </p>
              <p>
                {order.OrderAddress?.postalCode} -{" "}
                {order.OrderAddress?.country.name}
              </p>
              <p>
                {order.OrderAddress?.countryId} {order.OrderAddress?.phone}
              </p>
            </div>
            <div className="h-[1px] bg-gray-200 my-6" />
            <div className=" w-full rounded-lg space-y-2">
              <h3 className="text-lg font-medium">Resumen de compra</h3>
              <div className="mt-4 space-y-1.5">
                <div className=" flex justify-between">
                  <p className="text-gray-700">#Productos</p>
                  <p className="text-gray-700">{order.itemsInOrder}</p>
                </div>
                <div className=" flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700">
                    {formatCurrency(order.subTotal)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">igv</p>
                  <p className="text-gray-700">{formatCurrency(order.tax)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Envio</p>
                  <p className="text-gray-700">$4.99</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold">
                      {formatCurrency(order.total)}
                    </p>
                  </div>
                </div>
                {!order.isPaid && (
                  <PaypalButton amount={order.total} orderId={order.id} />
                )}
              </div>
            </div>
          </article>
        </div>
      </section>
    </section>
  );
}
