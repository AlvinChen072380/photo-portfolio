'use client' // Context Provider 必須是 client Component

import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect, createContext, useContext } from "react";


interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  children: React.ReactNode;
}
// 使用 React.ReactNode 可以確保 ThemeProvider 裡面可以塞任何東西，而不會噴型別錯誤。

// 2.建立 Context 本體 (預設值 undefined or null)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3.建立 Provider 元件 (供應商)
// 這個元件的職責是: 管理 State，並將它"廣播"給所有children
export function ThemeProvider({ children }: ThemeContextType ) {
  // 使用自製 Hook 預設為 'light' ，資料持久化
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('app_theme', 'light')

  // 切換邏輯
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // 監聽theme 改變，動態修改HTML 的 class (為了 Tailwind 的 dark Mode)
  useEffect(() => {
    const root = window.document.documentElement;
    // 先移除舊的，再加入新得
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, children }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 4.自定義Hook: useTheme (消費者)
// Best Practice: 不讓外部直接用 useContext(ThemeContext)
// 而是封裝成　useTheme，可以多做一層檢查
export function useTheme() {
  const context = useContext(ThemeContext);

  //防呆機制: 如果有人在 Provider 外面使用 useTheme，報錯提示
  if (context === undefined) {
    throw new Error('useTheme must be use with a ThemeProvider');
  }

  return context;
}