import { create } from "zustand";

export type MenuState = {
  isMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
};

export const useUIStore = create<MenuState>()((set) => ({
  isMenuOpen: false,
  openSideMenu: () => set({ isMenuOpen: true }),
  closeSideMenu() {
    set({ isMenuOpen: false });
  },
}));
