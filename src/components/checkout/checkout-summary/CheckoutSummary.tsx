"use client";
import { placeOrder } from "@/src/actions";
import { useAdressStore, useCartStore } from "@/src/store";
import { formatCurrency } from "@/src/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const CheckoutSummary = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState(false);
  const [error, setError] = useState("");

  const address = useAdressStore((state) => state.address);
  const { envio, igv, subTotal, total } = useCartStore(
    useShallow((state) => state.getSummaryInformation())
  );
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>loading...</p>;

  const onHandleGenerateOrder = async () => {
    setOrder(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Todo : generar los datos de la orden {address , cart}
    const { rememberAdress, ...rest } = address;
    const productsInCart = cart.map(({ id, quantity, size }) => ({
      id,
      quantity,
      size,
    }));

    const res = await placeOrder({
      productsOrder: productsInCart,
      address: rest,
    });
    setOrder(false);
    if (!res.ok) {
      setError(res.message);
      return;
    }
    // Todo salio bien!
    router.replace(`/orders/${res.order?.id}`);
  };

  return (
    <article className="bg-white shadow w-full space-y-4 p-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Datos de envio</h3>
        <p className="text-gray-700 font-medium">{`${address.name} ${address.lastName}`}</p>
        <p>{address.address}</p>
        <p>
          <span>{address.address2 ? address.address2 : ""}</span>{" "}
        </p>
        <p>
          {address.city} - {address.country}
        </p>
        <p>Codigo Postal: {address.postalCode}</p>
        <p># Telefono : {address.phone}</p>
      </div>
      <div className="h-[1px] bg-gray-200 my-6" />
      <div className=" w-full rounded-lg space-y-2">
        <h3 className="text-lg font-medium">Resumen de compra</h3>
        <div className="mt-4 space-y-1.5">
          <div className=" flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">{formatCurrency(subTotal)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">igv</p>
            <p className="text-gray-700">{formatCurrency(igv)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Envio</p>
            <p className="text-gray-700">{formatCurrency(envio)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">{formatCurrency(total)}</p>
              <p className="text-sm text-gray-700">incluye IGV</p>
            </div>
          </div>
        </div>
        {error && <p className="my-2 text-sm text-red-400 ">{error}</p>}
        <p className="text-sm text-right mt-4 text-slate-400">
          Tienes 2 dias para cancelar tu compra *
        </p>
        <button
          disabled={order}
          onClick={onHandleGenerateOrder}
          className={clsx({
            "btn-primary w-full": !order,
            "btn-disabled w-full": order,
          })}
        >
          {" "}
          Finalizar compra{" "}
        </button>

        <p className="text-xs text-blue-400 text-center ">
          Al realizar la compra aceptas los terminos y condiciones
        </p>
      </div>
    </article>
  );
};
