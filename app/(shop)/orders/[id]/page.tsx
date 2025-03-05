import { CheckoutItem, Title } from "@/src/components";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

export default function OrderDetailsPage() {
  return (
    <section className="px-10 max-w-[960px] mx-auto ">
      <Title
        title="Orden de Compra"
        subtitle={`Confirma tu compra - #123456`}
      />

      <div
        className={clsx(
          "flex gap-4 items-center w-1/2 rounded-lg text-xs py-1 pl-8",
          {
            "bg-green-100 text-green-800": true,
            "bg-red-100 text-red-800": false,
          }
        )}
      >
        <IoCardOutline size={30} />
        <p>Orden - Pagada</p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-10 my-12">
        <div className="col-span-2 grid grid-cols-1 gap-2">
          <CheckoutItem />
          <CheckoutItem />
          <CheckoutItem />
          <CheckoutItem />
        </div>

        <div className="col-span-2 w-full">
          <article className="bg-white shadow w-full space-y-4 p-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Direccion de envio</h3>
              <p className="text-gray-700 font-medium">
                Cesar Zubilete Sanchez
              </p>
              <p>Mz A6 LT32 AA.HH 10 De Octubre</p>
              <p>San juan de lurigancho - Lima</p>
              <p>Lima Distrito</p>
              <p>+51 999999999</p>
            </div>
            <div className="h-[1px] bg-gray-200 my-6" />
            <div className=" w-full rounded-lg space-y-2">
              <h3 className="text-lg font-medium">Resumen de compra</h3>
              <div className="mt-4 space-y-1.5">
                <div className=" flex justify-between">
                  <p className="text-gray-700">#Productos</p>
                  <p className="text-gray-700">10</p>
                </div>
                <div className=" flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700">$129.99</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">igv</p>
                  <p className="text-gray-700">$4.99</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Envio</p>
                  <p className="text-gray-700">$4.99</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                  </div>
                </div>
                <div
                  className={clsx(
                    "flex gap-4 items-center mt-4  rounded-lg text-xs py-1 pl-8",
                    {
                      "bg-green-100 text-green-800": true,
                      "bg-red-100 text-red-800": false,
                    }
                  )}
                >
                  <IoCardOutline size={30} />
                  <p>Orden - Pagada</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </section>
  );
}
