import { titleFont } from "@/src/config/fonts";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { CartLink } from "../link/CartLink";
import { ButtonMenu } from "./ButtonMenu";

export const TopMenu = () => {
  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* LOGO */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span>| Shop</span>
        </Link>
      </div>
      {/* CATEGORIAS NAVEGACION */}
      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 "
          href="/category/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 "
          href="/category/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 "
          href="/category/kid"
        >
          Niños
        </Link>
      </div>

      {/* BUSCADOR , CARRITO , MENU */}
      <div className="flex items-center gap-2">
        <Link href={"/search"} type="text">
          <IoSearchOutline className="w-6 h-6" />
        </Link>

        <CartLink />

        <ButtonMenu />
      </div>
    </nav>
  );
};
