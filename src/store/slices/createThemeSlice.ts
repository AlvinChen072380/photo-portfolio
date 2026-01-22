'use client' // Context Provider 必須是 client Component

import { StateCreator } from "zustand";
import { AppState } from "../useAppStore";

export interface ThemeSlice {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void; // 初始化用
}


// 建立 Slice
// StateCreator<總Store型別, [], [], 這個Slice型別>
// 目前尚未定義總 Store，所以第一個泛型先用 any 暫代，後續作修改

export const createThemeSlice: StateCreator<AppState, [],[], ThemeSlice> = (set) => ({
  theme: 'light', // 預設值

  toggleTheme: () => 
    set((state: ThemeSlice) => ({
      theme: state.theme === 'light' ? 'dark' : 'light'
    })),
    setTheme: (theme) => set({ theme }),
})