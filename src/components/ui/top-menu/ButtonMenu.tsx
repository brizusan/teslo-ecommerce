"use client";

import { useUIStore } from "@/src/store";

export const ButtonMenu = () => {
  const openMenu = useUIStore((state) => state.openSideMenu);

  return (
    <button
      onClick={openMenu}
      className="m-2 p-2 rounded-md cursor-pointer transition hover:bg-gray-100"
    >
      Menú
    </button>
  );
};
