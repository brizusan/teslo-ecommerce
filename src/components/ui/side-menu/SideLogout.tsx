"use client";
import { logout } from "@/src/actions";
import { useUIStore } from "@/src/store";
import { IoLogOutOutline } from "react-icons/io5";

type Props = {
  onCloseMenu: () => void;
};

export const SideLogout = ({ onCloseMenu }: Props) => {
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  return (
    <form action={logout}>
      <button
        type="submit"
        onClick={onCloseMenu}
        className="flex gap-4 items-center cursor-pointer w-full mt-2 p-2 hover:bg-gray-100 rounded transition-all"
      >
        <IoLogOutOutline size={22} />
        <span className="text-lg">Cerrar Sesion</span>
      </button>
    </form>
  );
};
