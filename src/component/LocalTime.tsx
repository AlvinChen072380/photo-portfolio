'use client'; 

import { useEffect, useState } from 'react';

export default function LocalTime({ dateString }: { dateString: string }) {
  const [formattedTime, setFormattedTime] = useState<string>('');

  useEffect(() => {
    // 當元件在瀏覽器載入後，使用瀏覽器的完整字典進行轉換
    const time = new Date(dateString).toLocaleString('zh-TW', {
      timeZone: 'Asia/Taipei', // 瀏覽器絕對看得懂這個
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    setFormattedTime(time);
  }, [dateString]);

  // 在轉換完成前，先顯示載入中或留白，避免畫面閃爍 (Hydration Error)
  if (!formattedTime) return <span className="text-gray-400">Loading time...</span>;

  return <span>{formattedTime}</span>;
}