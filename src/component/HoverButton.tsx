'use client'

import { useStore } from "../store"

interface HoverButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const HoverButton = ({ children, onClick }: HoverButtonProps) => {
  // 1.這邊不需讀取 Store 的資料，只需要執行 "發送動作"
  // 所以不用 useStore((state) => ...) 會觸發渲染的寫法

  // 2. 直接取得 Store 的操作方法 (getState)
  // 這是一個瞬時操作，完全不會綁定 React State
  const handleMouseEnter = () => {
    useStore.getState().setCursorVariant("button");
  };

  const handleMouseleave = () => {
    useStore.getState().setCursorVariant("default");
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseleave}
      className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition transform hover:scale-105 active:scale-95"
    >
      {children}
    </button>
  );
};

export default HoverButton;