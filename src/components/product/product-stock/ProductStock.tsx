"use client";

import { getStock } from "@/src/actions";
import { useEffect, useState } from "react";

export const ProductStock = ({ slug }: { slug: string }) => {
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(true);

  const getResStock = async () => {
    try {
      setLoading(true);
      const { stock } = await getStock(slug);
      setStock(stock);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // tomar respuesta de stock
    getResStock();
  }, []);
  return (
    <>
      {loading ? (
        <div className="bg-gray-200/40 animate-pulse w-[90px] h-[24px] text-center">
          &nbsp;
        </div>
      ) : (
        <p className="font-semibold">
          Stock : <span className="font-medium text-slate-600">{stock}</span>
        </p>
      )}
    </>
  );
};
