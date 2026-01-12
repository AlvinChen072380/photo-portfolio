'use client'

import { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function LikeButton () {
  // 1.使用useState Hook
  // 語法: const [變數名, 修改變數的函式] = useState(初始值);
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  // 2-1-1: 建立一個 Ref 來當作"旗標"，預設為 true (代表現在是第一次)
  // useRef 的特點 : 數值改變時 "不會" 觸發重新渲染
  const isFirstRender = useRef(true);

  // 1-1. 模擬 componentDidMount (Dependency Array 是空陣列 [])
  useEffect(() => {
    console.log('Function Component: Mounted!');
    const savedLike = localStorage.getItem('isLiked_func') === 'true';
    if (savedLike) {
      setLiked(true);
      setCount(1)
    }

    // 模擬 componentWillUmount (Return 一個 cleanup function)
    return () => {
      console.log('Function Component: Unmounted bye bye');      
    };
  }, [setLiked, setCount]);

  // 2-1. 模擬 componentDidUpdate (Dependency Array 有東西 [liked])
  useEffect(() => {
    // !! useEffect 第一次渲染也會執行，所以這裡的邏輯包含了 Mount + Update
    // 如果只想在Update 時執行，需要額外寫邏輯判斷 (useRef)，這是 Hooks 跟 Class 最大的不同
    //console.log('Function Component: State Changed!');
    // 檢查: 如果是第一次渲染，就什麼都不做，直接把旗標關掉
    if (isFirstRender.current) {
      isFirstRender.current = false;      
      return;       
    }

    // 這裡開始才是真正的 Update 邏輯 (第二次進行渲染才會跑這行) 
    console.log('Function Component: Updated (Writing to DB/Storage)');    
    localStorage.setItem('isLiked_func', String(liked));    
  }, [liked]); // <<< 只要 Liked 改變，這裡就會執行


  // 2.定義事件處理函式 (Event Handler)
  const handleClick = () => {
    // 1.鎖定"目標植": 明確定義現在發生了什麼事
    const newLiked = !liked; //這裡算出 true (Single Source of Truth)
    // 2.更新狀態A : 設為 true
    setLiked(newLiked);

    // 3.更新狀態B : 根據剛剛算出的true 來決定加減
    setCount((prevCount) => (newLiked ? prevCount + 1 : prevCount - 1));
  };

 /*  const handleClick = () => {
    // 這裡展示兩種 setState 的寫法
    
    // 寫法 A: 直接依賴當前的變數 (閉包 Closure)
    setLiked(!liked);
    
    // 寫法 B: 使用 callback 確保拿到最新的值 (這在非同步更新時更安全)
    setCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  }; */

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded=full transition-colors border ${
        liked
          ? 'bg-red-50 border-red-200 text-red-500'
          : 'br-white border0gray-200 text-gray-600 hover:br-gray-50'
        }`}
    >
      <Heart className={`w-5 h-5 ${liked ? 'fill-current' : "" }`}/>
      <span className="font-medium">{count} Likes</span>
    </button>

  )
}