'use client'
import { useMotionValue, useSpring, useTransform, motion} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const TiltCard = () => {
  const ref = useRef<HTMLDivElement>(null);

  // A.縮放狀態管理
  const[isZoomed, setIsZoomed] = useState(false);

  // 1. 定義 MotionValues (儲存滑鼠相對於中心點的位置)
  // 初始直設為 0 
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 2.加入物理彈簧 (Spring Physics)
  // 增加慣性緩衝的效果，比較自然
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  /* 
  stiffness (硬度/剛度)：數值越高，彈簧回彈的力量越強（動作越快）。
  damping (阻尼)：數值越高，震盪消失得越快。若設為 0 會停不下來。
  mass (質量)：物體的重量。數值越高，慣性越大，起步慢但衝力強。
  restDelta: 當數值變動小於此值時，視為停止運動（優化效能）。
 */

  // 3. 映射運算 (The Mapping Art)
  // 數入範圍: 假設卡片寬約 400px，滑鼠偏移量約在 -200 ~ 200 之間
  // 輸出範圍: 旋轉角度 -20deg ~ 20deg

  // 當滑鼠在 "右邊" (正 X) -> 預期卡片往右轉 -> 繞著 Y 軸旋轉
  // 當華數在 "上面" (負 Y) -> 預期卡片往上抬 -> 繞著 X 軸 "正向" 旋轉

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // 4.處理滑鼠移動
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    // 計算滑鼠相對於卡片左上角的座標
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // ***計算百分比偏移量 (Normalize to -0.5 ~ 0.5)
    // 0.5 代表最右 / 下邊， -0.5 代表最 左/上邊， 0 代表中心
    const xPct = (mouseX / width) - 0.5 ;
    const yPct = (mouseY / height) - 0.5;

    // 更新 MotionValues
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    //滑鼠離開時，歸零(卡片回正)
    x.set(0);
    y.set(0);
    setIsZoomed(false); // 離開時自動縮小
  };

  return (
    <div className="flex items-center justify-center h-[50vh] perspective-[1000px]">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsZoomed(!isZoomed)} // 點擊切換狀態
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d", // **保留 3D 空間，讓子元素也能 3D
        }}
        animate={{ 
          scale: isZoomed ? 1.2 : 1, // 放大1.2倍
          zIndex: isZoomed ? 50 : 1 // 放大時Z層級往上
         }}
         transition={{ type: "spring", stiffness: 200, damping: 20 }} // 縮放的物理彈簧狀態
        className="relative w-80 h-96 rounded-3xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-2xl cursor-pointer group"
      >
        {/*  3D 圖片層 */}
        <div
          className="absolute inset-4 rounded-2xl overflow-hidden shadow-inner"
          style={{ 
            transform: "translateZ(30px)" // 讓圖片浮起來 30px
           }}
        >
          <Image
            src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop"
            alt="3D Car"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/*  "3D 懸浮"的內容層
              透過 translateZ 讓其浮在卡片上方
        */}
        <div
          style={{ transform: "translateZ(60px)" }}
          className="absolute bottom-10 left-10 text-white pointer-events-none"
        >
          <h2 className="text-3xl font-bold uppercase tracking-widest drop-shadow-lg">
            Cyberpunk
          </h2>
          <p className="text-sm text-cyan-400 font-mono">
            {isZoomed ? "Click to Zoom Out" : "Click to Zoom In"}
          </p>
        </div>

        {/* 裝飾: 反光效果 (Glossy Sheen)
            例上 CSS 漸層 + 混合模式，隨著滑鼠角度來改變反光位置會更真實
        */}
        <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
      </motion.div>
    </div>
  );
};

export default TiltCard;