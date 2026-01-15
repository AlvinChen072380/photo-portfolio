"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  // 1.解決SSR問題: 確保只在Client 端渲染
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 當 Modal 打開時，鎖住背景滾動 (Body Lock)
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function: 關閉時恢復滾動
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // 如果沒掛載或是沒打開，就不渲染任何東西
  if (!mounted || !isOpen) return null;

  // 2.傳送門核心: createPortal(JSX, 目標 DOM)
  // 這裡我們直接傳送到 document.body
  return createPortal(
    <>
      {/* 背景遮罩 (Overlay) - 點擊背景關閉 */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal 本體 - 居中顯示 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">{/* pointer-events-none 的意思是：
          「我是透明人，滑鼠點擊請穿過我，去點後面的東西（也就是上面的背景遮罩）」
          這解決了「點背景沒反應」的問題。
      */}
        <div
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 dark:border-gray-800 pointer-events-auto transform transition-all animate-in fade-in zoom-in-95 duration-200"
          // 阻止點擊本體時觸發背景關閉 (冒泡)
          onClick={(e) => e.stopPropagation}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {title || "Info"}
            </h3>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 cursor-pointer" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 text-gray-600 dark:text-gray-300">{children}</div>
        </div>
      </div>
    </>,
    document.body // 傳送目的地(參考google文件說明)
  );
}
