'use client'

/* import PhotoCard from "@/src/component/PhotoCard"; */
import { photos, Photo } from "@/src/data/photo";
import ContactForm from "@/src/component/ContactForm";
import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Modal from "@/src/component/Modal";
import LikeButton from "@/src/component/LikeButton";
import { Search } from "lucide-react";

import ErrorBoundary from "@/src/component/ErrorBoundary";
import VirtualizedPhotoGrid from "@/src/component/VirtualizedPhotoGrid";


/* const expensiveCalculation = (data: Photo[]) => {
  const start = performance.now();
  while (performance.now() - start < 1) {
    // 空迴圈模擬大量運算，單純浪費CPU時間
  }
  return data;
}; */



export default function Home() {
  // 紀錄當前輩點選的照片，如果是 unl凹代表沒打開 Lightbox
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  // Phase4. 搜尋狀態新增
  const [searchTerm, setSearchTerm] = useState('');

  // Phase4. 篩選邏輯 (無使用 useMemo 的版本)
  /* console.log('--- Home Component Rendered ---'); */

  // Phase4.3 使用useMemo優化
  // 語法: const cachedValue = useMemo(() => { 計算邏輯 }, [ 依賴陣列 ]);
  const filteredPhotos = useMemo(() => {
    /* console.log(' Running Expensive Filter... (Re-calculating)'); */
    return photos.filter((photo) => 
      photo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
    // Phase4. 執行昂貴計算 (模擬效能頻瓶頸)  
   /* return expensiveCalculation(result); */

  },[searchTerm]); // <--- 只有當searchTerm 改變時，才允許重新計算
  // 注意：這裡我們依賴了 photos (外部常數) 和 searchTerm。
  // 如果 photos 是從 props 傳進來的，也要加進依賴陣列。

  // useCallback 凍結函式
  // 只要依賴陣列 [] 沒變，這個 handlePhotoClick 就永遠是同一個記憶體位址
  const handlePhotoClick = useCallback((photo: Photo) => {
    setSelectedPhoto(photo);
  }, []);

  

  return (
   <main className="h-screen flex flex-col p-8 max-w-7xl mx-auto overflow-hidden">

    <header className="mb-8 shrink-0 px-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-200 dark:text-white">Gallery</h1>
      <p className="text-gray-400 dark:text-gray-400">Explore the collection.</p>

      {/*  Phase4. 搜尋框 */}
      <div className="relative max-w-md pt-3">
      <Search className="absolute left-3 top-5.5 w-5 h-5 text-gray-400" />
      <input 
        type="text"
        placeholder="Search photos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500
        outline-none transition-all"
      />
      </div>
    </header>

    <ErrorBoundary
      fallback={
        <div className="py-20 text-center space-y-4">
          <div className="text-6xl">😵</div>
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">
            Gallery temporarily unavailable
          </h3>
          <p className="text-gray-500">
            Some photos are causing issues. Please try refreshing.
          </p>
        </div>
      }
    >
      {/* photo grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg: grid-cols3 gap-6 mb-20">
        {filteredPhotos.map((photo, index) => (
          <PhotoCard 
            key={photo.id} 
            photo={photo} */}
      {/*       // 傳入 onClick，這會啟動 PhotoCard 裡的 e.preventDefault() */}
         {/*    onClick={handlePhotoClick}
            priority={index < 4}
          />
        ))} */}

       {/* 改用虛擬化列表 */}
        {filteredPhotos.length > 0 ? (
         <VirtualizedPhotoGrid
            photos={filteredPhotos}
            onPhotoClick={handlePhotoClick}
         />
        ) : (
          <div className="text-center py-20 text-gray-500">
            No photos found.
          </div>
        )}      
    </ErrorBoundary>  

      {/* Lightbox (重用 Modal) */}
      <Modal
        isOpen={!!selectedPhoto} // 只要 selectedPhoto 有值就是 true
        onClose={() => setSelectedPhoto(null)} // 關閉清空狀態
        title={selectedPhoto?.title}
      >
        {selectedPhoto && (
          <div className="space-y-4">
            <div className="relative aspect-video w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex justify-between items-center">              
                <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full cursor-pointer">
                  {selectedPhoto.category}
                </span>
                <LikeButton photoId={selectedPhoto.id}/>  
            </div>
          </div>
        )}
      </Modal>

      {/* 聯絡表單 (Phase 2.3 add) */}
      {/* <div className="border-t border-gray-200 dark:border-gray-800 pt-10">
        <ContactForm />
      </div> */}
   </main>
  );
}
