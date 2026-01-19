'use client'

import React, { createContext, useContext, useReducer, useEffect } from "react"

//  1.定義型態形狀: 這是一個物件，Key是 photoId, Value 是 boolean (是否按讚)
// 例如: { "1": true, "2": false, "50": true }
type LikesState = Record<string, boolean>;

// 2.定義 Action (指令)
type Action = 
|  { type: 'TOGGLE_LIKE'; photoId: string }
|  { type: 'LOAD_FROM_STORAGE'; state: LikesState };

// 3. Reducer 函式:負責處理邏輯
// state: 目前的狀態, action: 接收到的指令
function likesReducer(state: LikesState, action: Action): LikesState {
  switch (action.type) {
    case 'TOGGLE_LIKE': {
      const newState = {
        ...state,
        [action.photoId]: !state[action.photoId] // 反轉該 ID 的狀態
      };
      // 副作用: 寫入 LocalStorage (在 Reducer 裡副作用其實不完美，但為了簡單先這樣寫)
      // 更嚴謹的做法適用 useEffect 監聽 state 變化
      localStorage.setItem('photo_likes_store', JSON.stringify(newState));
      return newState;
    }
    case 'LOAD_FROM_STORAGE':
      return action.state;
      default: 
      return state;
  }
}

// 4. 建立 Context
interface LikesContextType {
  isLiked: (id: string) => boolean;
  toggleLike: (id: string) => void;
}

const LikesContext = createContext<LikesContextType | undefined>(undefined);

export function LikesProvider({ children }: { children: React.ReactNode }) {
// 使用 useReducer
const [state, dispatch] = useReducer(likesReducer, {});

// 初始化: 從 LocalStorage 讀取所有按讚紀錄
useEffect(() => {
  const stored = localStorage.getItem('photo_like_store');
  if (stored) {
    try {
      dispatch({ type: 'LOAD_FROM_STORAGE', state: JSON.parse(stored) });
    } catch (e) {
      console.error("Failed to parse likes", e);
    }
  }
}, []);

// Helper Function 
const isLiked = (id: string) => !!state[id]; //強制轉 boolean
const toggleLike = (id: string) => dispatch({ type: 'TOGGLE_LIKE', photoId: id });

return (
  <LikesContext.Provider value={{ isLiked, toggleLike }}>
    {children}
  </LikesContext.Provider>
);
}

// Custom Hook
export function useLikes() {
  const context = useContext(LikesContext);
  if (!context) throw new Error('useLikes must be used within LikesProvider');
  return context;
}