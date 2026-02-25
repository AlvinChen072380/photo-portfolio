'use client'

import { useState, useEffect } from "react";


export default function Footer() {
  // 1. 初始直設為"空 null" or "通用值number" (Server & Client 一致)
  const [randomId, setRandomId] = useState<number | null>(null);

  // 在 Render 裡使用隨機數字或時間
  /* const randomId = Math.random(); */

  // 2. 在 useEffect 裡才隨機生成數 (確保在 Client 端執行)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRandomId(Math.random());
  }, []);

  return (
    <footer className="py-6 text-canter text-xs text-gray-500 dark:text-gray-400 mt-20 border-t border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-white/30 dark:bg-black/30">
      <p>© {new Date().getFullYear()} 
        Magic Shop. ID: {randomId && <span> ID: {randomId}</span>}</p>
    </footer>
  )
}



/* 修復方案 B (The "Suppress" Way) */
//export default function Footer() {
  // 💣 再次使用直接生成 (會導致不一致)
/*   const randomId = Math.random(); 

  return (
    <footer className="...">
      <p>
        © {new Date().getFullYear()} Magic Shop.  */
        {/* ⭐️ 使用 suppressHydrationWarning 屬性 */}
{/*         <span suppressHydrationWarning>
           ID: {randomId}
        </span>
      </p>
    </footer>
  );
} */}