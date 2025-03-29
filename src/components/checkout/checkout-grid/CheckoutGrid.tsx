"use client";
import { CartProduct } from "@/src/interfaces";
import { useEffect, useState } from "react";
import { CheckoutItem } from "../checkout-item/CheckoutItem";

type Props = {
  cart: CartProduct[];
};

export const CheckoutGrid = ({ cart }: Props) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>loading...</p>;
  return (
    <div className="col-span-2 grid grid-cols-1 gap-2 self-start">
      {cart.map((item) => (
        <CheckoutItem key={item.id} productOrder={item} />
      ))}
    </div>
  );
};
