import { useState, useEffect } from "react";


// T 可以是 string, number 等任何型別
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 1. 設定計時器，delay 毫秒後更新值
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 2. 清除計時器 (如果 value 在 delay 時間內右改變了，就會取消上一次的計時)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}