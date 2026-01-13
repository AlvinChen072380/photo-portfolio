import Image from "next/image";
import { Photo } from "../data/photo";
import Link from "next/link";
/* import LikeButton from "./LikeButton"; */

interface PhotoCardProps {
  photo: Photo;
 /*  onLike: () => void; */ //PhotoCard 被迫經手不相關的資料!!prop drilling
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  return (
    // group class 是 Tailwind 的功能，讓子元素可以根據父層狀態改變樣式
    // aspect-square > aspect-ratio: 1 / 1 適合用來處理RWD
    // 圖片包裹Link 成為連結，不用 <a> tag
    <Link href={`/photo/${photo.id}`} className="block">
      <div className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 cursor-pointer">
        <Image
          src={photo.url}
          alt={photo.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* 漸層遮罩與標題 - hover 時才會出現 */}
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
          <h3 className="text-white font-medium text-lg translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
            {photo.title}
          </h3>
          {/* prop drilling sample */}
          {/* <div className="translate-y-4 transition-transform duration-300 group-hover:translate-y-0 delay-75">
            <LikeButton onLike={onLike}/>
          </div> */}
        </div>
      </div>
    </Link>
  );
}