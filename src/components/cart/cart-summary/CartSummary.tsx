"use client";
import { useCartStore } from "@/src/store";
import { formatCurrency } from "@/src/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const CartSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const { envio, quantityProducts, igv, subTotal, total } = useCartStore(
    useShallow((state) => state.getSummaryInformation())
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>....loading</p>;

  return (
    <div className="md:fixed w-full md:w-[270px] rounded-lg  bg-white spacey-2 p-6 shadow-md ">
      <h3 className="text-lg font-medium">Resumen de compra</h3>
      <span className="text-sm font-semibold">
        {quantityProducts} articulos
      </span>
      <div className="mt-4 space-y-1">
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
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">{formatCurrency(total)}</p>
            <p className="text-sm text-gray-700">incluye IGV</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Link
          href={"/checkout/address"}
          className="block btn-primary text-center"
        >
          Check out
        </Link>
      </div>
    </div>
  );
};
