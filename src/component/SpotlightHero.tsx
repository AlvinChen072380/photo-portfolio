'use client'
import { useRef, useEffect } from "react";

const SpotlightHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1.監聽滑鼠移動 (Native DOM Event)
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();

      // 計算滑鼠 "相對於容器" 的座標
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 2. 瞬時更新 CSS 變數 (Direct Update)
      // 我們直接把數值寫盡 style 屬性裡，完全繞過 React Render
      container.style.setProperty("--x", `${x}px`);
      container.style.setProperty("--y", `${y}px`);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[60vh] bg-black overflow-hidden flex items-center justify-center cursor-default"
      style={{ 
        // ✅ 新增這行：給它一個初始值 (例如 -1000px，讓光圈跑去很遠的地方) 
        // 這樣 CSS 在第一時間解析時，mask 就是有效的 (雖然照在看不到的地方)
        "--x": "-1000px", // 定義初始狀態!!!
        "--y": "-1000px", // CSS 父子層繼承問題!!!
       } as React.CSSProperties}
    >
      {/* 裝飾用網格背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"/>

      {/* ---層次結構開始--- */}

      {/* 1. 底層(暗):永遠顯示，作為輪廓導引 */}
      <div className="absolute z-10 pointer-events-none select-none">
        <h1 className="text-6xl font-bold text-gray-800 tracking-tighter text-center px-4">
          My Interactive Portfolio<br />
          <span className="text-4xl text-gray-900">Move your mouse to reveal</span>
        </h1>
      </div>

      {/* 2. 上層(亮):預設被遮住，只有聚光登照到時才顯示 */}
      <div
        className="absolute z-20 pointer-events-none select-none"
        style={{         
          // CSS mask***
          // 先定義一個放射狀漸層 (Radial Gradient)
          // 圓心位置: var(--x) var(--y) => 由 JS 即時更新
          // 顏色:black (可見) => transparent (不可見)
          maskImage: "radial-gradient(circle 250px at var(--x) var(--y), black, transparent)",
          WebkitMaskImage: "radial-gradient(circle 250px at var(--x) var(--y), black, transparent)",
        }}
      >

        {/* 這裡的內容要與底層一樣，但樣式是高亮的 */}
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-tighter text-center px-4">
          My Interactive Portfolio<br />
          <span className="text-4xl text-white">Move your mouse to reveal</span>
        </h1>
      </div>

    </div>
  );
};

export default SpotlightHero;