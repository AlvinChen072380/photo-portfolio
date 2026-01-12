import { useState, useEffect, useRef } from "react";

// <T> 是"型別佔位符"，T的值 由呼叫的 Hook 來決定
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  // 2.處理第一次渲染useRef
  const isFirstRender = useRef(true);
  // 3.從 LocalStorage 讀取資料
  useEffect(() => {
    try {
      // 使用 try-catch，防止 JSON 解析失敗導致網頁錯誤
      const item = window.localStorage.getItem(key);
      if (item) {
        // 如果有值，解析並更新 State
        //JSON.parse 是為了支援物件、數字等各種格式，不只是字串
        setValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}:`, error);
    }
  }, [key]);

  // 4. Update: 當 Value 改變時，寫入 LocalStorage
  useEffect(() => {
    // 檔掉第一次渲染(因為第一次渲染是預設值，可能會覆蓋掉原本存在 Storage 的資料)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    try {
      // 寫入時統一轉成 JSON 字串
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [value, key]); // 只要 value 或 key 變了就存

  // 5.回傳 [數值，修改函式]
  // as const 告訴TypeScript 這個陣列的長度跟型別是固定的，模擬 useState 的行為
  return [ value, setValue ] as const;
}