"use client";

import Link from "next/link";
import { Camera, Moon, Sun, Info } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import Modal from "./Modal";

/* interface NavbarProps {
  totalLikes: number;
} */

export default function Navbar(/* { totalLikes }:NavbarProps */) {
  const { theme, toggleTheme } = useTheme();

  // 1.控制 Modal 開關的狀態
  const [isAboutOpen, setIsAboutOpen] = useState(false);

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
            <span>PhotoFolio</span>
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
        <div className="space-y-4">
          <p>
            Welcome to <strong>PhotoFolio</strong>, a conceptual photography portfolio built to demonstrate advanced React patterns.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Next.js 15 (App Router)</li>
            <li>React Portals & Context API</li>
            <li>Tailwind CSS v4 Dark Mode</li>
            <li>TypeScript & Custom Hooks</li>
          </ul>
          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setIsAboutOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Got it!
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
