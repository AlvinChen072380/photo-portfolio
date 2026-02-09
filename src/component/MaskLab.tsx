'use client'
import { useRef, useEffect } from "react";
import Image from "next/image";

const MaskLab = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty("--x", `${x}px`);
      container.style.setProperty("--y", `${y}px`);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[50vh] bg-slate-400 flex items-center justify-center overflow-hidden"
      style={{ "--x": "-1000px", "--y": "-1000px" } as React.CSSProperties}
    >
      {/* 底層圖片 */}
      <Image
        src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" 
        alt="Background"
        fill
        priority
        className="absolute inset-0 object-cover opacity-100"
      />

      {/* 遮罩層: 使用 composite 做 "挖洞" 效果 */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-indigo-600"
        style={{ 
          // 1. 第一層遮罩: 全黑 (代表整張顯示)
          // 2. 第二層遮罩: 滑鼠位置的圓圈
          maskImage: `
            radial-gradient(circle 180px at var(--x) var(--y), black, transparent),
            linear-gradient(black, black)          
          `,
          WebkitMaskImage: `
            radial-gradient(circle 180px at var(--x) var(--y), black, transparent),
            linear-gradient(black, black)
          `,

          // 3.關鍵: 合成模式 (composite) 排除 (XOR) 或 減去
          // 這裡使用 'exclude' (排除)，重疊的地方會變成透明
          maskComposite: "exclude",
          WebkitMaskComposite: "xor", // Webkit (Chrome/Safari) 的語法不同
         }}
      >
        <h1
          className="text-6xl font-black text-white tracking-widest uppercase"
        >
          Black Hole
        </h1>
      </div>

      <p
          className="absolute bottom-10 text-white opacity-50"
      >
        移動滑鼠體驗 「挖洞」 效果</p>
    </div>
  );
};

export default MaskLab;