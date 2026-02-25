'use client'; // 👈 確保在客戶端執行

import { useEffect, useState } from 'react';

export default function LocalTime({ dateString }: { dateString: string }) {
  const [formattedTime, setFormattedTime] = useState<string>('');

  useEffect(() => {
    try {
      // 1. 確認瀏覽器收到的字串
      //console.log("👉 1. 資料庫原始時間:", dateString);

      // 2. 轉換成 Date 物件
      const dateObj = new Date(dateString);

      // 3. 使用更穩定的 Intl API 來強制轉換台北時區
      const formatter = new Intl.DateTimeFormat('zh-TW', {
        timeZone: 'Asia/Taipei',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      const time = formatter.format(dateObj);
      
      // 4. 印出最終結果，確認瀏覽器有沒有算錯
      //console.log("✅ 2. 瀏覽器算出的台灣時間:", time);
      
      // 5. 更新畫面
      setFormattedTime(time);
    } catch (error) {
      console.error("時間轉換失敗:", error);
      setFormattedTime("Time Error");
    }
  }, [dateString]);

  if (!formattedTime) return <span className="text-gray-400">計算中...</span>;

  // 我加上了綠色，如果畫面變綠色，代表這段新程式碼 100% 成功蓋過 Vercel 舊快取了
  return <span className="font-bold text-gray-800 dark:text-gray-100">{formattedTime}</span>;
}