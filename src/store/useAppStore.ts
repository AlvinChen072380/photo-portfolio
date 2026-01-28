import { create } from "zustand";
import { createThemeSlice, ThemeSlice } from "./slices/createThemeSlice";
import { createLikesSlice, LikesSlice } from "./slices/createLikeSlice";

import { createCartSlice, CartSlice } from "./slices/createCartSlice";
import { BackgroundSlice, createBackgroundSlice } from "./slices/createBackgroundSlice";

// 1.定義總 Store 的型別 (包含所有 Slices)
// 使用 & (Intersection Type) 把所有介面黏在一起
export type AppState = ThemeSlice & LikesSlice & CartSlice & BackgroundSlice;

// 2.建立 Store
export const useAppStore = create<AppState>()((...a) => ({
  // 使用 Spread Operator 把 Slice 的功能展開進來
  ...createThemeSlice(...a),
  ...createLikesSlice(...a),
  ...createCartSlice(...a),
  ...createBackgroundSlice(...a),
}));


// 3. 訂閱與副作用管理 (Subscription)


// A. Theme 副作用: 監聽 theme 變化，修改 HTML class
useAppStore.subscribe((state, prevState) => {
  if (state.theme === prevState.theme) return;

  const root = typeof window !== 'undefined' 
    ? window.document.documentElement 
    : null;
  if (!root) return;

  // 這裡的邏輯與原本 Context 裡的 useEffect 一樣，
  // 只要 Store 裡的 theme 變了，就修改 DOM
  root.classList.remove('light', 'dark');
  root.classList.add(state.theme);

  // 修改後存入 LocalStorage
  localStorage.setItem('app_theme', state.theme);
});


// B. Likes 副作用:防抖存檔
let saveTimer: NodeJS.Timeout | null = null;

useAppStore.subscribe((state, prevState) => {
  // 效能優化: 只有當 likes 真的變了才執行 (避免toggleTheme 時也觸發此處)
  if (state.likes === prevState.likes) return;

  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    console.log('💾 Saving Likes to LocalStorage... (Debounced)');
    localStorage.setItem('photo_likes_store', JSON.stringify(state.likes));    
  }, 1000);  
});

let cartSaveTimer: NodeJS.Timeout | null = null;

useAppStore.subscribe((state, prevState) =>{
  if (state.cart === prevState.cart) return;

  if (cartSaveTimer) clearTimeout(cartSaveTimer);
  cartSaveTimer = setTimeout(() => {
    console.log('🛒 Saving Cart to LocalStorage... (Debounced)');
    localStorage.setItem('shopping_cart', JSON.stringify(state.cart));    
  }, 1000)
});