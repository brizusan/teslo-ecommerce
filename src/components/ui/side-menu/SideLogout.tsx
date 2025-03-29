"use client";
import { useUIStore } from "@/src/store";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";

export const SideLogout = () => {
  const router = useRouter();
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  return (
    <button
      type="submit"
      onClick={async () => {
        await signOut();
        closeMenu();
        router.push("/");
      }}
      className="flex gap-4 items-center cursor-pointer w-full mt-2 p-2 hover:bg-gray-100 rounded transition-all"
    >
      <IoLogOutOutline size={22} />
      <span className="text-lg">Cerrar Sesion</span>
    </button>
  );
};
