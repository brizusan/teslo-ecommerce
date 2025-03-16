"use client";
import { useUIStore } from "@/src/store";
import { signOut } from "next-auth/react";
import { IoLogOutOutline } from "react-icons/io5";

export const SideLogout = () => {
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  return (
    <button
      type="submit"
      onClick={async () => {
        await signOut();
        closeMenu();
        // window.location.reload();
      }}
      className="flex gap-4 items-center cursor-pointer w-full mt-2 p-2 hover:bg-gray-100 rounded transition-all"
    >
      <IoLogOutOutline size={22} />
      <span className="text-lg">Cerrar Sesion</span>
    </button>
  );
};
