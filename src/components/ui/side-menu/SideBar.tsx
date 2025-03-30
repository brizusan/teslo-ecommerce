"use client";
import { useUIStore } from "@/src/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearch,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { SideBarLink } from "./SideBarLink";
import { SideLogout } from "./SideLogout";

export const SideBar = () => {
  const closeMenu = useUIStore((state) => state.closeSideMenu);
  const menuOpen = useUIStore((state) => state.isMenuOpen);

  const { data: session, update } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    update();
  }, []);

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
          {isAuthenticated ? (
            <>
              <SideBarLink
                href="/profile"
                icon={<IoPersonOutline size={22} />}
                name="Perfil"
                onCloseMenu={closeMenu}
              />
              <SideBarLink
                href="/orders"
                icon={<IoTicketOutline size={22} />}
                name="Mis Ordenes"
                onCloseMenu={closeMenu}
              />
              <SideLogout />
            </>
          ) : (
            <SideBarLink
              href="/auth/login"
              icon={<IoLogInOutline size={22} />}
              name="Ingresar"
              onCloseMenu={closeMenu}
            />
          )}
        </div>
        {isAuthenticated && isAdmin && (
          <>
            <div className="my-10 bg-gray-200 h-[1px] " />
            <div>
              <SideBarLink
                href="/admin/products"
                icon={<IoShirtOutline size={22} />}
                name="Productos"
                onCloseMenu={closeMenu}
              />{" "}
              <SideBarLink
                href="/admin/orders"
                icon={<IoTicketOutline size={22} />}
                name="Ver Ordenes"
                onCloseMenu={closeMenu}
              />{" "}
              <SideBarLink
                href="/admin/users"
                icon={<IoPeopleOutline size={22} />}
                name="Usuarios"
                onCloseMenu={closeMenu}
              />
            </div>
          </>
        )}
      </nav>
    </>
  );
};
