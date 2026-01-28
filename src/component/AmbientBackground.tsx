'use client'

import { usePathname } from "next/navigation"
import { useAppStore } from "../store/useAppStore";
import { useEffect, useState } from "react";
import { scenes } from "../data/backgrounds";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function AmbientBackground() {
  const pathname = usePathname();

  // 1.從 Store 取出狀態與方法
  const { currentScene, setScene, isCartOpen } = useAppStore();

  // Hydration fix
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // 2.狀態挑選機邏輯 (State Machine Logic)
  // 這裡決定了什麼情況顯示什麼背景
  useEffect(() => {
    if (pathname === '/checkout') {
      setScene('mordor'); // 結帳頁背景圖片
    } else if (isCartOpen) {
      setScene('rivendell'); // 購物車背景圖片
    } else {
      setScene('shire'); // 首頁背景圖片
    }
  },[pathname, isCartOpen, setScene]);

  // 取得目前場景的詳細資料
  const sceneData = scenes[currentScene];

  if (!mounted) return null;
  
  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden pointer-events-none">
      {/* 3. Framer Motion 交叉淡入淡出 (Cross-fade) */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={sceneData.id}
          initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1.05, filter: 'blur(4px)' }}
          exit={{ opacity:0, scale: 1.1, filter: 'blur(10px)' }}
          // exit 決定了前後圖片的淡出淡入
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* 4. 底色遮罩 (確保文字可讀性)) */}
          <div className={`absolute inset-0 ${sceneData.overlayColor} z-10 transition-colors duration-1000`}/>

          {/* 5. Next.js Image */}
          <Image
            src={sceneData.url}
            alt={sceneData.alt}
            fill
            priority
            quality={70}
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* 全域紋理 (增加畫面質感) */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] z-20 mix-blend-overlay"></div>
    </div>
  );
}