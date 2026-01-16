'use client'

import PhotoCard from "@/src/component/PhotoCard";
import { photos, Photo } from "@/src/data/photo";
import ContactForm from "@/src/component/ContactForm";
import { useState } from "react";
import Image from "next/image";
import Modal from "@/src/component/Modal";
import LikeButton from "@/src/component/LikeButton";

export default function Home() {
  // 紀錄當前輩點選的照片，如果是 unl凹代表沒打開 Lightbox
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  return (
   <main className="min-h-screen p-8 max-w-7xl mx-auto">
    <header className="mb-12">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Gallery</h1>
      <p className="text-gray-600 dark:text-gray-400">Explore the collection.</p>
    </header>

      {/* photo grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg: grid-cols3 gap-6">
        {photos.map((photo) => (
          <PhotoCard 
            key={photo.id} 
            photo={photo}
            // 傳入 onClick，這會啟動 PhotoCard 裡的 e.preventDefault()
            onClick={(p) => setSelectedPhoto(p) }
          />
        ))}
      </div>

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
                <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  {selectedPhoto.category}
                </span>
                <LikeButton/>             
            </div>
          </div>
        )}
      </Modal>

      {/* 聯絡表單 (Phase 2.3 add) */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-10">
        <ContactForm />
      </div>
   </main>
  );
}
