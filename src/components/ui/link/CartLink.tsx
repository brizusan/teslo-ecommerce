"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";

export const CartLink = () => {
  const pathname = usePathname();

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
            "absolute top-[-8px] right-[-8px] bg-blue-600 text-white rounded-full w-5 h-5 flex justify-center items-center text-sm",
            {
              "bg-red-500": pathname === "/cart",
            }
          )}
        >
          3
        </span>
        <IoCartOutline className="w-6 h-6" />
      </div>
    </Link>
  );
};
