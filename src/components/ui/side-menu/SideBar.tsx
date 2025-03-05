"use client";
import { useUIStore } from "@/src/store";
import clsx from "clsx";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearch,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { SideBarLink } from "./SideBarLink";

export const SideBar = () => {
  const closeMenu = useUIStore((state) => state.closeSideMenu);
  const menuOpen = useUIStore((state) => state.isMenuOpen);

  return (
    <>
      {/* Background */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-50"></div>
      )}

      {/* Blur o difuminado */}
      {menuOpen && (
        <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-blur-sm"></div>
      )}

      {/* SideBar - Menu */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-full md:w-[450px] xl:w-[500px] h-screen z-20 bg-white shadow transform transition-all duration-300 ",
          {
            "translate-x-full": !menuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={36}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeMenu}
        />
        {/* input de busqueda */}
        <div className="relative mt-16">
          <div className="flex overflow-hidden rounded-md bg-gray-200 focus:outline focus:outline-blue-500">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-bl-md rounded-tl-md bg-gray-100 px-4 py-2.5 text-gray-700 focus:outline-blue-500"
            />
            <button className="bg-blue-500 px-3.5 text-white duration-150 hover:bg-blue-600">
              <IoSearch size={24} />
            </button>
          </div>
          <div className="mt-4 flex gap-x-10 text-gray-400">
            <p>#Kids</p>
            <p>#Women</p>
            <p>#Men</p>
          </div>
        </div>
        {/* Categorias */}
        <div className="my-8">
          <SideBarLink
            href="/"
            icon={<IoPersonOutline size={22} />}
            name="Perfil"
          />
          <SideBarLink
            href="/"
            icon={<IoTicketOutline size={22} />}
            name="Ordenes"
          />{" "}
          <SideBarLink
            href="/"
            icon={<IoLogInOutline size={22} />}
            name="Ingresar"
          />{" "}
          <SideBarLink
            href="/"
            icon={<IoLogOutOutline size={22} />}
            name="Salir"
          />
        </div>
        <div className="my-10 bg-gray-200 h-[1px] " />
        <div>
          <SideBarLink
            href="/"
            icon={<IoShirtOutline size={22} />}
            name="Productos"
          />{" "}
          <SideBarLink
            href="/"
            icon={<IoTicketOutline size={22} />}
            name="Ordenes"
          />{" "}
          <SideBarLink
            href="/"
            icon={<IoPeopleOutline size={22} />}
            name="Usuarios"
          />
        </div>
      </nav>
    </>
  );
};
