'use client'
import { useRef, useState } from "react";
import { motion } from "framer-motion";


const MagneticButton = () => {
  const ref = useRef<HTMLDivElement>(null);

  // 使用 React State 來存座標(Framer Motion 的 Animate prop 吃 state 較方便)

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    // 1.取得按鈕目前的中心點與尺寸
    // 直接拿 ref 計算，回頭看 step.1 的幾何應用
    const { height, width, left, top } = ref.current!.getBoundingClientRect();

    // 計算中心點座標
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

      // 2-1.計算滑鼠與按鈕中心的距離
      const distance = Math.sqrt(middleX ** 2 + middleY ** 2);
      const proximity = 300; // 偵測範圍：半徑 300px 內都會被吸過來

      if (distance < proximity) {
        // 2-2.增加一個權重計算，讓越靠近時吸力越強，遠處較弱
        const force = (proximity - distance) / proximity; 
        setPosition({ x: middleX * 0.3 * force, y: middleY * 0.3 * force });
      } else {

      // 2.設定磁力係數 (0.3 代表滑鼠動 10px, 按鈕動 3px)
      // 可以調整數值調整 磁力強弱
      setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
    }
  };

  const handleMouseLeave = () => {
    // 3.滑鼠離開時，歸零(彈回原位)
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div     
      className="h-[40vh] w-[40vw] flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}   
    >
      <motion.div
        ref={ref}
        

        // 4.Framer Motion 會偵測當 position 改變時，自動協助平滑過渡
        animate={{ x: position.x, y: position.y }}

        // 5. 物理參數: 向彈簧一樣彈回去
        // stiffness (硬度): 越大越硬，回彈越快
        // damping (阻尼): 越小越晃， 越大越不晃
        transition={{ type: "spring", stiffness: 300, damping: 5, mass: 0.1 }}

        className="group relative cursor-pointer px-10 py-5 bg-black text-white rounded-full text-xl font-bold uppercase tracking-wider overflow-hidden "
      >
        <span className="relative z-10 pointer-events-none">Magnetic</span>

        {/* 裝飾: 可以加一個 hover 的底色變化，增強互動感 */}
        <div className="absolute inset-0 bg-amber-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"/>
      </motion.div>
    </div>
  );
};

export default MagneticButton;