"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { createPortal } from "react-dom";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";

// 1.定義動畫變體 (同規格書一樣寫在外面)
const backdropVariants : Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const drawerVariants = {
  hidden: { x: "100%", opacity: 0.2 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { 
      type: "tween" as const, 
      /* damping: 30, stiffness: 120 */
      ease: "easeInOut" as const, 
      duration: 0.6},
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {       
      type: "tween" as const,
      duration: 0.2, 
      ease: "easeInOut" as const },
  },
};

export default function CartDrawer() {
  // 1. 從 Store 取得資料與方法
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useAppStore();

  // 2.解決 Hydration 問題 (確保只在 Client 端渲染 Portal)
  const [mounted, setMounted] = useState<boolean>(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // 3.計算總金額 (假設每張 $50)
  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * 50, 0);

  // 如果還沒掛載，或是購物車沒打開，就不渲染
  if (!mounted /* || !isCartOpen */) return null;

  // 4.使用 Portal 掛載到body
  return createPortal(
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* 黑色遮罩 (Backdrop) */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/50 "
            onClick={closeCart}
          />

          {/* 側邊欄 (Drawer) */}
          <motion.div 
            key="drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col">
            {/* Header */}
            <div className="p-4 border-b dark:border-gray-800 flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ShoppingBag /> Shopping Cart
              </h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }} //whileHover?
                whileTap={{ scale: 0.9 }}
                onClick={closeCart}
                title="Close cart"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Body: 商品列表 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.photo.id}
                    className="relative flex gap-4 p-3 bg-gray-200 dark:bg-gray-800/50 rounded-lg"
                  >
                    {/* 縮圖 */}
                    <div className="relative w-25 h-25 shrink-0 bg-gray-200 rounded-md overflow-hidden">
                      <Image
                        src={item.photo.url}
                        alt={item.photo.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* 資訊 */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-medium line-clamp-1">
                          {item.photo.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          ${50} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex-justify-between items-center">
                        {/* <span className="font-bold">${50 * item.quantity}</span> */}
                        <button
                          onClick={() => removeFromCart(item.photo.id)}
                          title="Remove item from cart"
                          className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex justify-between items-end mt-2">
                        {/* 數量控制器 */}
                        <div className="flex items-center gap-1.5 bg-white dark:bg-gray-700 rounded-lg px-2 py-1 shadow-sm border border-gray-200 dark:border-gray-600">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => decreaseQuantity(item.photo.id)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded disabled:opacity-50 cursor-pointer"
                          >
                            <Minus className="w-4 h-4 " />
                          </motion.button>

                          <span className="text-sm font-bold min-w-6 text-center">
                            {item.quantity}
                          </span>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => increaseQuantity(item.photo.id)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>

                          <span className="font-bold">
                            ${50 * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer 結帳區 */}
            {cart.length > 0 && (
              <div className="p-4 border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                <div className="flex justify-between items-center mb-4 text-lg font-bold">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
                {/*  <button className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-bold hover:opacity-90 transition-opacity">
              Checkout
            </button> */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-bold text-center hover:opacity-90"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body // 掛載目標
  );
}
