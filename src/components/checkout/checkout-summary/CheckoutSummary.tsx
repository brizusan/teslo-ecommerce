import Link from "next/link";

export const CheckoutSummary = () => {
  return (
    <article className="bg-white shadow w-full space-y-4 p-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Direccion de envio</h3>
        <p className="text-gray-700 font-medium">Cesar Zubilete Sanchez</p>
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
              <p className="text-sm text-gray-700">incluye IGV</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-right mt-4 text-slate-400">
          Tienes 2 dias para cancelar tu compra *
        </p>
        <Link
          href={`/orders/123456`}
          className="block mt-2 btn-primary text-center"
        >
          {" "}
          Finalizar compra{" "}
        </Link>

        <p className="text-xs text-blue-400 text-center ">
          Al realizar la compra aceptas los terminos y condiciones
        </p>
      </div>
    </article>
  );
};
