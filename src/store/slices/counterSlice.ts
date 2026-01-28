import { StateCreator } from "zustand";

export interface CounterSlice {
  count: number;

  // Actions
  increment: () => void;
  decrement: () => void;
}

export const createCounterSlice: StateCreator<CounterSlice> = (set) => ({

  /* count: number,

  increment: (count:number) => set({
    count: number + 1,
  }),

  decrement: (count:number) => set ({
    count: number - 1,
  }), */


  // 1. 給定明確的初始值
  count: 0,
  // 2. 使用 Callback 取得當前的 state  
  increment: () => set((state) => ({
    // 這裡的 state 代表「更新前一秒」的所有狀態
    count: state.count + 1
  })),

  decrement: () => set((state) => ({
    count: state.count -1 
  })),

  // 比較：如果是直接設定某個值 (不依賴舊值)，就不需要 callback
  // setCount: (num) => set({ count: num }),
});