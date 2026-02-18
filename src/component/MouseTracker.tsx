import { memo, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from "framer-motion";
import { useStore } from "../store";


/* const MouseContext = createContext({x: new MotionValue(0), y: new MotionValue(0) })
 */
const MouseTracker = () => {
  // 1.建立容器數值 (初始值為0)
  // 這些數值改變時，React Component "不會" 重新渲染
  const x = useMotionValue(0);
  const y = useMotionValue(0);
 

  // 2.(option) 為了讓移動更自然，可以增加一點彈簧物理效果
  // springX 會一直追蹤 x，但是帶有物理慣性
  const springConfig = { stiffness: 400, damping: 30 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig); 
  // 顏色漸變 Mapping
  const color = useTransform(x, [0, 500], ["#ff0000", "#0000ff"]);
  // 速度變形
  // 取得 X 軸的速度
  const xVelocity = useVelocity(springX);
  // 根據速度改變縮放比例: 速度越快 => 寬度越大 (拉伸效果)
  // 輸入速度範圍 [-1000, 0, 1000]，輸出寬度比例 [2, 1, 2]
  const scaleX = useTransform(xVelocity, [-2000, 0, 2000], [2, 1, 2]);

  // B. 新增：速度旋轉 (傾斜效果)
  // 當速度往左(-)，就逆時針轉；速度往右(+)，就順時針轉
  // 輸出範圍是角度 (deg)
  const rotate = useTransform(xVelocity, [-2000, 2000], [-45, 45]);

  // C. 新增：位置濾鏡 (色相旋轉變色)
  // 根據 X 位置，改變圖片的色相 (Hue)
  // 0deg 是原色，轉 360deg 又回到原色
  const hueRotate = useTransform(x, [0, window.innerWidth], [0, 360]);
  // 把數值組合成 CSS filter 字串
  const filter = useTransform(hueRotate, (h) => `hue-rotate(${h}deg) drop-shadow(2px 4px 6px rgba(0,0,0,0.5))`);

  
  // Lab 2 新增: 狀態變形
  // 建立一個 "基礎大小" 的 MotionValue
  // 預設是 1 (正常大小)，碰到按鈕變成 1.5 (放大)，碰到文字變 0.5 (縮小)
  const baseScale = useMotionValue(1);

  // 為了讓變化平滑，我們也給他加個彈簧
  const springBaseScale = useSpring(baseScale, { stiffness: 300, damping: 20 });

  // Lab 2 進階混合 最終縮放 = 基礎大小 * 速度拉伸
  // useTransform 支援多個 MotionValue 的組合運算
  const finalScaleX = useTransform(
    [springBaseScale, scaleX],
    ([base, vel]: number[]) => base * vel
  );
  // Lab 2 同步讓 Y 軸也跟著基礎大小縮放 (保持比例)
  const finalScaleY = springBaseScale;


   // 4.為了驗證 React 沒有渲染，增加一個 Ref 計數器
  const renderCount = useRef(0);
  // 使用Ref，直接操作 DOM context 來顯示滑鼠移動座標
  const textRef = useRef<HTMLDivElement>(null); 


  // Lab 2 靜脈監聽 (Silent Listening)
  useEffect(() => {
    // 這裡我們直接訂閱 Store，而不是在 Component 裡面用 selector
    // 這樣 Store 更新時，MouseTracker "不會" Re-render
    const unsubscribe = useStore.subscribe(
      (state) => state.cursorVariant, // 監聽對象(中間層過濾對象)
      (variant) => { //要在useStore加入subscribeWithSelector 中間層，才能讓subscribe接收兩個參數
        // 當 variant 改變時，執行這裡的邏輯callback
        console.log("游標狀態改變", variant);
        
        if (variant === 'button') {
          baseScale.set(1.5) // 變大
        } else if (variant === 'text') {
          baseScale.set(0.5); //變小
        } else {
          baseScale.set(1); //恢復原狀
        }
      }
    );
    return unsubscribe;
  }, []); //只執行一次
  
  useEffect(() => {
    renderCount.current += 1;
    console.log(` MouseTracker Render: ${renderCount.current}`);
  });

  // 監聽座標並更新文字 (不觸發 Render)
  useEffect(() => {
    // 監聽 x & y 的變化 (Framer Motion 的監聽器)
    // 這是一個 "非 React" 的監聽，不會觸發 Render
    const unsubscribeX = x.on("change", (latestX) => {
      if (textRef.current) {
        // 直接手動組合修改 DOM 文字
        textRef.current.textContent = `X: ${Math.round(latestX)} | Y: ${Math.round(y.get())}`;
      }
    });
    return () => unsubscribeX(); // 清理步驟
  }, [])


  useEffect(() => {     
    const handleMouseMove = (event: MouseEvent) => {
      // 3.直接更新 MotionValue
      // 這行程式碼的執行頻率極高(60-144 /s)
      // 但因為是 .set()，所以 React 完全不會有感覺
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    // 監聽器清理!!
    return () => window.removeEventListener("mousemove", handleMouseMove);    
  }, []); // 空陣列，因為只在掛載時執行一次   

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* 顯示渲染次數 (驗證畫面動作狀況) */}
      <div className="absolute top-1 left-45 bg-black/80 text-white p-1 rounded shadow-lg font-mono">
        React Render Count: {renderCount.current}
      </div>
      <div 
        ref={textRef}
        className="absolute top-1.5 left-6 text-green-400"
      >
      Waiting for input...
      </div>

      {/* 跟隨的圓球 */}
      {/* ***直接把 MotionValue (springX) 傳給style */}
      <motion.img

        src="/Nyan-Cat.png"
        alt="globe icon"

        style={{ 
          x: springX, //綁定 x 座標
          y: springY, //綁定 y 座標
          translateX: "-120%", //修正中心點
          translateY: "-80%",
          //backgroundColor: color, // 綁定漸變顏色
          scaleX: finalScaleX, // 綁定速度變形
          scaleY: finalScaleY,

          rotate: rotate,
          filter: filter,
          width: "140px",
          height:"80px",

          mixBlendMode: "difference",
         }}
         className="absolute top-0 left-0 w-10 h-10 object-fill"     
      />      
    </div>
  )
}

export default memo(MouseTracker);