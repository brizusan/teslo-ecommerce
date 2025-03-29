"use client";
import { OrderItem } from "@/src/interfaces";
import { formatCurrency } from "@/src/utils";
import Image from "next/image";

export const CheckoutItem = ({ productOrder }: { productOrder: OrderItem }) => {
  const subtotal = productOrder?.price * productOrder?.quantity;

  const productImage = productOrder.image
    ? `/products/${productOrder.image}`
    : `/products/${productOrder.product?.ProductImage[0].url}`;

  return (
    <>
      <div className="flex gap-4 items-center text-sm ">
        <Image
          src={productImage}
          width={150}
          height={150}
          alt="imagen de producto"
          className="object-cover"
        />
        <div className="flex-1 space-y-1  py-3">
          <h3 className="font-bold antialiased text-sm">
            {productOrder?.title}
          </h3>
          <p className="font-medium text-lg text-slate-700">
            {formatCurrency(productOrder.price!)}{" "}
            <span>x{productOrder.quantity}</span>
          </p>
          <p className="font-semibold">
            Subtotal :{" "}
            <span className="font-semibold text-slate-800">
              {formatCurrency(subtotal)}
            </span>{" "}
          </p>
          <p className="font-semibold">
            Talla seleccionada :{" "}
            <span className="font-light">{productOrder?.size}</span>
          </p>
        </div>
      </div>
    </>
  );
};
