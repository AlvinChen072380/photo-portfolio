'use client'
import { useRef, useEffect } from "react";

const MathLab = () => {
  // React 操作虛擬 DOM 但是 getBoundingClientRect()需要真實DOM才能執行並取的數值
  // 所以使用 useRef 告訴 React，請把這個按鈕在瀏覽器中生成真實節點，並存進buttonRef.current裡。
  const buttonRef = useRef<HTMLButtonElement>(null); 

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      // 1. 取得按鈕的位置與尺寸 (相對於Viewport)
      const rect = button.getBoundingClientRect();

      // 2. 計算按鈕中心點
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // 3. 計算滑鼠相對於中心點的偏移量 (Delta)
      // e.clientX 是滑鼠位置
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // 4. 計算直線距離 (Distance) 
      // Math.hypot = square root of sum of squares 畢氏定理
      const distance = Math.hypot(deltaX, deltaY);

      // 5. 設定只在滑鼠接近時 log
      if (distance < 200) {
        console.table({
          "滑鼠 X": Math.round(e.clientX),
          "按鈕中心 X": Math.round(centerX),
          "偏移量 (Delta X)": Math.round(deltaX),
          "總距離 (Distance)": Math.round(distance),
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="h-[50vh] flex item-center justify-center bg-gray-100">
      <button
        ref={buttonRef}
        className="px-7 py-4 bg-blue-600 text-white rounded-xl shadow-lg text-xl font-bold transition-transform"
      >
        🧲 靠近我，觀察 Console
      </button>
    </div>
  );
};

export default MathLab;