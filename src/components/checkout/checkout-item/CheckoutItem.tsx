import { formatCurrency } from "@/src/utils";
import Image from "next/image";

export const CheckoutItem = () => {
  return (
    <div className="flex gap-4 items-center ">
      <Image
        src="/products/1473809-00-A_1_2000.jpg"
        width={150}
        height={150}
        alt="imagen de producto"
        className="object-cover"
      />
      <div className="flex-1 space-y-1  py-3">
        <h3 className="font-bold antialiased">Producto</h3>
        <p className="font-medium text-slate-700">
          {formatCurrency(200)} <span>x1</span>
        </p>
        <p className="">
          Subtotal :{" "}
          <span className="font-semibold">{formatCurrency(200)}</span>{" "}
        </p>
      </div>
    </div>
  );
};
