//建立動態資料夾
import Image from "next/image";
import Link from "next/link";
import { photos } from "@/src/data/photo";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import LikeButtonClass from "@/src/component/LikeButtonClass";
import LikeButton from "@/src/component/LikeButton";


interface PhotoPageProps {
  params: Promise<{ id:string }>
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  // 1.解開 Promise 取得 id
  const { id } = await params;

  // 2.模擬從資料庫找資料
  const photo = photos.find((p) => p.id === id);

  // 3.如果找不到，回傳404
  if (!photo) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="w-full max-w-4xl mx-auto br-white rounded-2xl shadow=xl overflow-hidden">
        {/* 返回按鈕 */}
        <div className="p-4 border-b">
          <Link
            href="/"
            className="text-gray-600 hover:text-black flex items-center gap-2 transition-colors"
          >
            <ArrowLeft/>BacK to Gallery
          </Link>
        </div>

        {/* 大圖區域 */}
        <div className="relative aspect-video br-gray-100">
          <Image
            src={photo.url}
            alt={photo.title}
            fill
            priority // LCP 優化
            className="object-contain"
          />
        </div>

        {/* 資訊區域 */}
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{photo.title}</h1>
              <span className="inline-block border-r-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {photo.category}
              </span>
            </div>
            {/* 後續放蒐藏按鍵 */}
            <div className="flex gap-4 items-center">

                {/* Class Component Version */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-gray-400">Class (old)</span>
                <LikeButtonClass />
              </div>

                {/* Function Component version */}
            
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs text-gray-400">Function (New)</span>
                  <LikeButton />
                </div>
            </div>      

          </div>
        </div>
      </div>
    </div>
  );
}