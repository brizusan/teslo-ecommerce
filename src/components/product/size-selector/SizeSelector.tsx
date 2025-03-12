"use client";
import { Size } from "@/src/interfaces";
import clsx from "clsx";
import { useState } from "react";

type Props = {
  sizeSelected?: Size;
  avaliableSizes: Size[];
};

export const SizeSelector = ({ sizeSelected, avaliableSizes }: Props) => {
  const [selected, setSelected] = useState(sizeSelected);

  return (
    <>
      <div className="flex">
        {avaliableSizes.map((size) => (
          <button
            key={size}
            className={clsx(
              "mx-2 hover:underline text-lg cursor-pointer text-slate-500 font-medium",
              {
                "text-slate-900 underline": selected === size,
              }
            )}
            onClick={() => setSelected(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </>
  );
};
