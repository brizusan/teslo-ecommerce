"use client";

import { useCartStore } from "@/src/store";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";

export const CartLink = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalQuantity());

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <Link
      href={"/cart"}
      className={clsx(
        "w-10 h-10 flex justify-center items-center rounded-full  transition-colors",
        {
          " text-red-500": pathname === "/cart",
        }
      )}
      type="text"
    >
      <div className="relative">
        <span
          className={clsx(
            "absolute top-[-9px] right-[-9px] bg-blue-600 text-white  rounded-full w-5 h-5 flex justify-center items-center text-sm",
            {
              "bg-red-400  ": pathname === "/cart",
              "bg-transparent": totalItems === 0,
            }
          )}
        >
          {totalItems === 0 && loading ? "" : totalItems}
        </span>
        <IoCartOutline className="w-6 h-6" />
      </div>
    </Link>
  );
};
