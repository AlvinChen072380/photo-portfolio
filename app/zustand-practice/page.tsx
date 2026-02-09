'use client'

import { useStore } from "@/src/store"
import { useState, useEffect } from "react"

import PerformanceLab from "@/src/component/ProfileDisplay";
import Navigation from "@/src/component/Navigation";
import MenuOverlay from "@/src/component/MenuOverlay";
import MouseTracker from "@/src/component/MouseTracker";
import HoverButton from "@/src/component/HoverButton";
import SpotlightHero from "@/src/component/SpotlightHero";
import MathLab from "@/src/component/MathLab";
import MaskLab from "@/src/component/MaskLab";
import MagneticButton from "@/src/component/MagneticButton";
import TiltCard from "@/src/component/TiltCard";

export default function Home() {
  // 1. Selectors 選取狀態
  const { 
    count, increment, decrement,
    user, login, logout, isLoading, error
   } = useStore((state) => state);

   // 2. Local Storage 本地狀態
   const [ usernameInput, setUsernameInput ] = useState("");
   const [ emailInput, setEmailInput ] = useState("");

   // 3. Hydration Fix
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
    setIsMounted(true);
   }, []);

   // Mount 如未完成，就先不顯示內容
   if (!isMounted) return <div className="p-10">初始化中...</div>;

   // 4. 處理登入
   const handleLogin = async () => {
    if(!usernameInput || !emailInput) return alert("請輸入名字 & Email");
    // 呼叫在slice寫好的 Async Action
    await login(usernameInput, emailInput);
   };

   return (
    <main className="min-h-screen p-8 bg-slate-50 text-slate-900 flex flex-col items-center gap-10">


      <SpotlightHero/>

      <Navigation/>

      <MenuOverlay/>

      <h1 className="text-3xl font-bold">Zustand 修煉場: 持久化測試</h1>

      {/* A: Counter 測試 */}
      <section className="p-6 bg-white rounded-xl shadow-lg w-full max-w-md border border-slate-200">
        <h2 className="text-xl font-semibold mb-4 border-b px-2">1. Counter Slice</h2>
        <div className="flex items-center justify-between">
          <button
            onClick={decrement}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded text-red-700 font-bold transition"
          >
            - 減少
          </button>

          <span className="text-4xl font-mono font-bold text-blue-600">
            {count}
          </span>

          <button
            onClick={increment}
            className="px-4 py-2 bg-green-100 hover:bg-green-200 rounded text-gree-700 font-bold transition"
          >
            + 增加
          </button>
        </div>
      </section>

      {/* B: User 測試 (Async & Persist) */}
      <section className="p-6 bg-white rounded-xl shadow-lg w-full max-w-md border border-slate-200">
        <h1 className="text-4xl">歡迎來到我的網站</h1>
        <p>點擊右上的按鈕測試動畫</p>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">2. User Slice (Async + Persist)</h2>        
        <MouseTracker />

        <div className="flex flex-col gap-10 items-center justify-center min-h-[50vh]">
          <h2 className="text-2xl font-bold">Lab 2: 靜默監聽測試區</h2>

          {/* 測試按鈕 */}
          <HoverButton onClick={() => alert("被點到了!!")}>
            我是會讓 Nyan Cat 變大的按鈕
          </HoverButton>

          <div className="p-10 border border-gray-300">
            普通的區域 (Nyan Cat 應該是原狀)
          </div>

          <MathLab />

          <MaskLab />

          <MagneticButton />

          <TiltCard />
        </div>
    

        {/* 狀態顯示區 */}
        <div className="mb-4 min-h-15">
          {isLoading ? (
            <div className="text-blue-500 font-bold animate-pulse">⏳ 登入請求中...(等待1秒)</div>
          ): error ? (
            <div className="text-red-500 font-bold">❌ {error}</div>
          ): user ? (
            <div className="space-y-1">
              <p className="text-green-600 font-bold">✅ 已登入</p>
              <p>使用者: {user.name}</p>
              <p className="text-sm text-gray-500">Email: {user.email}</p>
            </div>
          ) : (
            <div className="text0-gray-400">尚未登入</div>
          )}
        </div>

        {/* 操作區 */}
        {!user ? (
          <div className="flex flex-col gap-3">
            <input 
              type="text"
              placeholder="輸入名字 (Ex: Gemini)"
              className="border p-2 rounded"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
            <input 
              type="text"
              placeholder="輸入 Email (Ex: text@mail.com)"
              className="border p-2 rounded"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-300 transition"
            >
              {isLoading ? "處理中..." : "登入"}
            </button>
          </div>
        ) : (
          <button
            onClick={logout}
            className="w-full bg-slate-200 text-slate-700 py-2 rounded hover:bg-slate-300 transition"
          >
            登出
          </button>
        )}
      </section>

      <div className="text-sm text-gray-500 max-w-md text-center">
        💡 測試說明：<br/>
        1. 點擊登入 (觀察 1 秒延遲)。<br/>
        2. 調整 Counter 數字。<br/>
        3. <b>按下重新整理 (F5)</b>，檢查資料是否還在。
      </div>

      <PerformanceLab/>
    </main>
   );
}