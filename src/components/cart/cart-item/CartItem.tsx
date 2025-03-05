import { formatCurrency } from "@/src/utils";
import Image from "next/image";
import { ProductQuantity } from "../../product/product-quantity/ProductQuantity";

export const CartItem = () => {
  return (
    <div className="flex gap-4 items-center bg-white shadow">
      <Image
        src="/products/1473809-00-A_1_2000.jpg"
        width={150}
        height={150}
        alt="imagen de producto"
        className="object-cover"
      />
      <div className="flex-1 space-y-1.5  py-3">
        <h3 className="font-bold antialiased">Producto</h3>
        <p className="font-medium text-slate-700">{formatCurrency(200)}</p>
        <ProductQuantity />
        <button
          type="button"
          className="underline-offset-2 underline cursor-pointer hover:no-underline"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
