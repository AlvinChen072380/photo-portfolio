import Image from "next/image";
import { Photo } from "../data/photo";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { memo } from "react";

interface PhotoCardProps {
  photo: Photo;
  /*  onLike: () => void; */ //PhotoCard 被迫經手不相關的資料!!prop drilling
  onClick?: (Photo: Photo) => void;
  priority?: boolean;
}

function PhotoCard({ photo, onClick, priority }: PhotoCardProps) {
  // Error Boundary test
 /*  if (photo.id === '5') {
    throw new Error('Simulation: Photo 5 corrupted!');
  }
 */
  return (
    // group class 是 Tailwind 的功能，讓子元素可以根據父層狀態改變樣式
    // aspect-square > aspect-ratio: 1 / 1 適合用來處理RWD
    // 圖片包裹Link 成為連結，不用 <a> tag
    <Link 
      href={`/photo/${photo.id}`} 
      className="block"
      // 阻止Link觸發預設連結邏輯: 事件攔截 (Intercept)
      onClick={(e) => {
        if (onClick) {
          e.preventDefault(); // 1.阻止<Link> 的預設換頁行為
          onClick(photo); // 2.換而執行我們自定義的動作
        }
      }}
    >
      <div className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 cursor-pointer">
        <Image
          src={photo.url}
          alt={photo.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />

        {/* 漸層遮罩與標題 - hover 時才會出現 */}
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4 justify-between">
          <h3 className="text-white font-medium text-lg translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
            {photo.title}
          </h3>
          {/* prop drilling sample */}     
          <div className="translate-y-4 transition-transform duration-300 group-hover:translate-y-0 delay-75 cursor-pointer">
            <LikeButton photoId={photo.id}/>
          </div>     
        </div>
        
      </div>
    </Link>
  );
}

export default memo(PhotoCard);
// 在匯出時，用 memo 包起來
// 這就像是說：「請記住這個元件，如果 props 沒變，就直接拿上次畫好的結果出來用」

