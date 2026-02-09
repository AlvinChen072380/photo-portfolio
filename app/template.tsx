'use client' //轉場模板

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      // 1. 初始狀態:稍微往下偏移 (y: 20)，透明度 0
      initial={{ opacity: 0, y: 20 }}

      // 2. 進場狀態: 回到原位 (y: 0)，透明度 1
      animate={{ opacity: 1, y: 0 }}

      // 3. 過渡設定:緩動效果
      transition={{ ease: 'easeInOut', duration: 0.5 }}

      className="min-h-screen" // 確保佔滿視窗高度
    >
      {children}
    </motion.div>
  )
}