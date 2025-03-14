"use client";
import { Size } from "@/src/interfaces";
import clsx from "clsx";

type Props = {
  sizeSelected?: Size;
  avaliableSizes: Size[];

  onChangeSize: (size: Size) => void;
};

export const SizeSelector = ({
  sizeSelected,
  avaliableSizes,
  onChangeSize,
}: Props) => {
  return (
    <>
      <div className="flex">
        {avaliableSizes.map((size) => (
          <button
            key={size}
            className={clsx(
              "mx-2 hover:underline text-lg cursor-pointer text-slate-500 font-medium",
              {
                "text-slate-900 underline": sizeSelected === size,
              }
            )}
            onClick={() => onChangeSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </>
  );
};
