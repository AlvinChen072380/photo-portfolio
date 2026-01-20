/* 
Store 定義：單純的狀態與 Action。

Selectors：效能優化的關鍵。

Debounce Subscription：你最想學的防抖存檔。
 */

import { create } from "zustand";

// 1.定義 State 與 Action
interface LikesState {
  likes: Record<string, boolean>;
  toggleLike: (id: string) => void;
  // 加入一個 init 動作，用來在意開始讀取 LocalStorage
  initLikes: (storedLikes: Record<string, boolean>) => void;
}

// 2. 建立 Store
export const useLikesStore = create<LikesState>((set) => ({
  likes: {}, // 初始狀態是空的

  toggleLike: (id) => 
    set((state) => ({
      likes: {
        ...state.likes,
        [id]: !state.likes[id], // 只反轉目標ID
      },
    })),

    initLikes: (storedLikes) => set({ likes: storedLikes }),
}));


// 3.實作 Debounce LocalStorage 

// 定義一個變數來存 Timer，放在 Store 外面(Module Scope)
let saveTimer: NodeJS.Timeout | null = null;

// Zustand 提供了 subscribe 方法，可以監聽 Store 的任何變動
// 設置一個監視器，關注Store
useLikesStore.subscribe((state) => {
  const currentLikes = state.likes;

  // A. 如果計時器在跑，先取消它(如果又重新按讚，重算時間)
  if (saveTimer) {
    clearTimeout(saveTimer);
  }

  // B. 設定新的計時器 (1000ms後存檔)
  saveTimer = setTimeout(() => {
    console.log('💾 Saving to LocalStorage... (Debounced)');
    localStorage.setItem('photo_likes_store', JSON.stringify(currentLikes));
  }, 500);
});