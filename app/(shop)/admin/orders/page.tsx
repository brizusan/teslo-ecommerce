import { getOrders } from "@/src/actions";
import { Title } from "@/src/components";
import clsx from "clsx";
import { Metadata } from "next";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: {
    template: "%s - Ordenes",
    default: "Todas las Ordenes",
  },
  description:
    "Administracion de ordenes , gestiona tus ordenes , vista de pedidos realizados",
};

export default async function OrdersPage() {
  const orders = await getOrders();
  console.log(orders);

  const isEmpty = orders.length === 0;

  return (
    <section className="px-10">
      <Title
        title="Todas las Ordenes | Admin"
        subtitle="A continuacion tenemos todas las ordenes registradas hasta el momento"
      />

      {isEmpty && (
        <div className="mt-20  min-h-[20vh] lg:min-h-[40vh]">
          <p className="text-center text-2xl">
            El usuario no tiene ordenes redistradas por el momento
          </p>
        </div>
      )}
      {!isEmpty && (
        <div className="my-10 max-w-[1380px] mx-auto min-h-[40vh]">
          <table className="min-w-full border">
            <thead className="bg-gray-200 border-b">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  #ID
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Nombre completo
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id.slice(0, 6)}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {order.OrderAddress?.firstName}{" "}
                    {order.OrderAddress?.lastName}
                  </td>
                  <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <IoCardOutline
                      className={clsx(
                        order.isPaid ? "text-green-600" : "text-red-600"
                      )}
                    />
                    <span
                      className={clsx("mx-2 font-medium", {
                        "text-green-700": order.isPaid,
                        "text-red-600": !order.isPaid,
                      })}
                    >
                      {order.isPaid ? "Pagada" : "Pendiente"}
                    </span>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 ">
                    <Link
                      href={`/orders/${order.id}`}
                      className="hover:underline"
                    >
                      Ver orden
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
