"use client";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

type Props = {
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
};

export const ProductQuantity = ({ quantity, onUpdateQuantity }: Props) => {
  const pathname = usePathname();
  console.log(pathname);
  const isProductCart = pathname === "/cart";
  return (
    <>
      <h3 className="font-medium text-sm">Seleccione la Cantidad</h3>
      <div className="flex flex-col gap-2 ">
        <div className="flex items-center gap-5">
          <button
            disabled={quantity === 1}
            className={clsx("hover:cursor-pointer", {
              "opacity-50 disabled:hover:cursor-not-allowed": quantity === 1,
            })}
            onClick={() => onUpdateQuantity(quantity - 1)}
          >
            <IoRemoveCircleOutline size={28} />
          </button>
          <span>{quantity}</span>
          <button
            disabled={quantity === 8}
            className={clsx("hover:cursor-pointer", {
              "opacity-50 disabled:hover:cursor-not-allowed": quantity >= 8,
            })}
            onClick={() => onUpdateQuantity(quantity + 1)}
          >
            <IoAddCircleOutline size={28} />
          </button>
        </div>
        {quantity === 8 && !isProductCart && (
          <span className="font-semibold text-sm text-red-400 italic">
            Máximo 8 productos por compra
          </span>
        )}
      </div>
    </>
  );
};
