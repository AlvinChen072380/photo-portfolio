import { StateCreator } from "zustand";

// 定義游標的狀態類型
export type CursorType = 'default' | 'text' | 'button';

export interface CursorSlice {
  cursorVariant: CursorType; // 當前狀態
  setCursorVariant: (variant: CursorType) => void; // 切換動作的狀態
}

export const createCursorSlice: StateCreator<CursorSlice> = (set) => ({
  cursorVariant: 'default', // 預設值是一般狀態

  // 這裡只更新狀態，不涉及任何 UI 邏輯
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
});