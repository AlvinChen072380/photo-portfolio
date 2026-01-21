'use client'

import { useRef, useEffect } from "react";
import { useAppStore } from "../store/useAppStore";

export default function StoreInitializer() {
  const initialized = useRef(false);
  // 取得兩個設定方法
  const initLikes = useAppStore((state) => state.initLikes);
  const setTheme = useAppStore((state) => state.setTheme);

  const initCart = useAppStore((state) => state.initCart);

  useEffect(() => {
    if (!initialized.current) {
      if (typeof window !== 'undefined') {
        // 1.初始化 Likes
        const storedLikes = localStorage.getItem('photo_likes_store');
        if (storedLikes) {
          try {
            initLikes(JSON.parse(storedLikes));
          } catch (e) {
            console.error('Failed to parse likes', e);
          }
        }
        // 2.初始化 Theme
        const storedTheme = localStorage.getItem('app_theme');
        if (storedTheme === 'dark' || storedTheme === 'light') {
          setTheme(storedTheme);

          document.documentElement.classList.toggle('dark', storedTheme === 'dark')
        }
        // 初始化 Cart
        const storedCart = localStorage.getItem('shopping_cart');
        if (storedCart) {
          try {
            initCart(JSON.parse(storedCart));
          } catch (e) {
            console.error('Failed to parse cart' , e)
          }
        }
      }
      initialized.current = true;
    }
  }, [initLikes, setTheme, initCart]);
  
  return null;
}