"use client";

import Link from "next/link";
import { Camera, Moon, Sun, Info } from "lucide-react";
//import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useAppStore } from "../store/useAppStore";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AboutContent from "./AboutContent";


/* interface NavbarProps {
  totalLikes: number;
} */

export default function Navbar(/* { totalLikes }:NavbarProps */) {

  // Selector 優化: Navbar 只訂閱 theme & toggleTheme
  // 其餘部件不會因為這裡改變而執行重繪
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  const openCart = useAppStore((state) =>state.openCart);
  const cartCount = useAppStore((state) => 
    state.cart.reduce((acc, item) => acc + item.quantity, 0));

  // 1.控制 Modal 開關的狀態
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <nav
        className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-10
      dark:bg-gray-900/80 dark:border-gray-800 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white"
          >
            <Camera className="w-6 h-6" />
            <span>Mordor-Gallery</span>
          </Link>

          {/* 
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
            Total Likes : <span className="text-blue-600">{totalLikes}</span>
          </div>
        </div> */}
          <div className="flex items-center gap-4">
            {/* 新增 About 按鈕 */}
            <button
              onClick={() => setIsAboutOpen(true)}
              className="p-2 rounded-full hover:br-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 cursor-pointer"
              aria-label="About"
            >
              <Info className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <ShoppingCart  className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer"/>

              {/* 紅色徽章 (Badge) */}
              <AnimatePresence>
              {mounted && cartCount > 0 && (
                <motion.span 
                  key={cartCount} // 更新觸發動畫
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}

                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </motion.span>
              )}
              </AnimatePresence>
            </button>

            {/* toggle button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/*  2. 放置 Modal 元件 (放在哪裡都可，因為這個元件會被 Portal 到 body) */}
      <Modal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        title="About PhotoFolio"
      >
       <AboutContent onClose={() => setIsAboutOpen(false)}/>
      </Modal>
    </>
  );
}
