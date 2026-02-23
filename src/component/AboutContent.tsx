import { CheckCircle2 } from "lucide-react";

/* const techStacks = [
  "Next.js 16 (App Router)",
  "React 19 & Server Actions",
  "TailWind CSS v4 Dark Mode",
  "Zustand State Management",
  "TypeScript & Custom Hooks",
  "List Virtualization (react-window)",
  "Framer Motion Animations"
]; */
const techCategories = [
  {
    category: "Core Architecture",
    items: [
      { name: "Next.js 16 (App Router)", desc: "傳統的 React 網頁只有一個入口，SEO效果較差。Next.js 讓我們可以輕鬆設定每個頁面的標題和分享縮圖，並且利用 App Router 讓頁面切換更直覺。 " },
      { name: "React 19", desc: "在表單區域使用了 React 19 最新的 useActionState 和 useFormStatus，減少手寫 loading 和 error 狀態，提升程式碼可讀性與維護性。" },
      { name: "TypeScript", desc: "事先定義型別，確保在開發的當下就能抓出錯誤(例如輸入錯誤變數名稱、資料格式)。" }
    ]
  },
  {
    category: "Performance",
    items: [
      { name: "List Virtualization (react-window)", desc: "在首頁的照片牆一次性導入2500張圖片後造成瀏覽器卡死，藉由引入虛擬化列表的概念，讓網頁只渲染可見範圍的圖片(約10~20張)，在滾動瀏覽時，原先使用的標籤會被收回拿來載入新的圖片，能讓瀏覽效果保持順暢。" },
      { name: "Custom Hook (ResizeObserver)", desc: "預計使用的第三方套件在最新環境下彙報錯，因此使用瀏覽器原生的API(ResizeObserver)寫了一個監聽器，搭配虛擬化列表來計算視窗高度。" },
      { name: "Debounce", desc: "當在首頁搜尋框快速輸入 Magic 等搜尋文字時，網頁會依照輸入字元瞬間重新計算數次進而造成頁面卡頓的情況，加入防抖後，網頁會等到鍵盤停下 0.3秒後才執行搜尋過濾，藉此節省電腦資源以及提升使用感受。" }
    ]
  },
  {
    category: "State Management",
    items: [
      { name: "Zustand", desc: "在管理購物車、深色模式、背景切換等部分等入Zustand執行狀態管理，相比傳統 Redux 簡單許多，程式碼簡短，而且不需要用 <Provider> 包裹整個APP，同時能解決 Prop Drilling 的問題產生。" },
      { name: "LocalStorage", desc: "讓使用者重新整理頁面後也能保留購物車以及深色模式的切換，藉由導入中間層(Middleware) Zustand Persist 讓狀態得以持久化。" }
    ]
  },
  {
    category: "UI & UX",
    items: [
      { name: "Tailwind CSS v4", desc: "導入Tailwind CSS 用於全站的排版與樣式設計以及 global.css，透過 CSS 變數(如@theme) 來控制深色模式與自訂義字體。" },
      { name: "Framer Motion", desc: "用於全站的平滑微互動動畫，購物車內容數量增加時，呈現紅色數字徽章的跳動效果， Modal 的滑出效果等。" },
      { name: "Font Style (字體優化)", desc: "為了營照更符合主題的情境感受，導入魔戒的字體(Ringw.woff2)，並確保字體檔案能跟著網站一起載入，避免網頁打開時是預設字體。" }
    ]
  },
  {
    category: "Serverless Backend 後端邏輯模擬",
    items: [
      { name: "Next.js Server Actions", desc: "透過模擬後端來處理 ContactForm.tsx 所取得的資料，直接在檔案內加上'use server'，就能讓前端表單安全的將資料送至後端進行驗證。" },      
    ]
  }
];

interface AboutContentProps {
  onClose: () => void;
}

export default function AboutContent({ onClose }: AboutContentProps) {
  return (    
    <div className="space-y-6"> 
      <p className="text-gray-600 dark:text-gray-300">
        Welcome to <strong className="text-gray-900 dark:text-white">Magic Portfolio</strong>, a conceptual photography portfolio built to demonstrate advanced front-end patterns.
      </p>      
     
      <div className="space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar pr-2">
        {techCategories.map((group, groupIndex) => (
          <div key={groupIndex} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
            {/* 分類大標題 */}
            <h3 className="font-bold mb-3 text-base md:text-lg text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 tracking-wide">
              {group.category}
            </h3>
            
            {/* 分類下的項目列表 */}
            <ul className="space-y-3">
              {group.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-3 tracking-wide">
                 
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    {/* 項目名稱 (粗體) */}
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200 tracking-wider">
                      {item.name}
                    </span>
                    {/* 說明文字 (較小、顏色較淡) */}
                    <span className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
        >
          Got it!
        </button>
      </div>
    </div>
  )
}


{/* <div className="space-y-4">
      <p className="text-gray-600 dark:text-gray-300">
        Welcome to <strong className="text-gray-900 dark:text-white">Mordor Gallery</strong>
      </p>

      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
        <h3 className="font-bold mb-3 text-gray-900 dark:text-white">Tech Stack</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
          {techStacks.map((tech, index) => (
            <li
              key={index}
              className="flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              <span>{tech}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
        >
          Got it!
        </button>
      </div>
    </div> */}