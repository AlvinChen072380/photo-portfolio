import { StateCreator } from "zustand";

export interface UISlice {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

export const createUISlice: StateCreator<UISlice> = (set) => ({

  isMenuOpen: false,

  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),

  closeMenu: () => set({ isMenuOpen: false }),
});