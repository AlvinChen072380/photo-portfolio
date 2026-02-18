import { useCallback, useMemo, useState } from "react";
import { Photo } from "../data/photo";
import { useDebounce } from "./useDebounce";

export function useGalleryLogic(photos: Photo[]) {
  // 1.狀態管理
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // 2.應用防抖 (delay 300ms)
  // 只有當使用者停止打字 300ms 後，debouncedSearchTerm 才會變
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // 3.篩選邏輯 (依賴 debouncedSearchTerm 而不是 searchTerm)
  const filteredPhotos = useMemo(() => {
    // 沒有搜尋詞，直接回傳原陣列 (效能較佳)
    if (!debouncedSearchTerm) return photos;

    return photos.filter((photo) =>
      photo.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [photos, debouncedSearchTerm]);

  // 4.事件處理
  const handlePhotoClick = useCallback((photo: Photo) => {
    setSelectedPhoto(photo);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // 回傳 UI 需要的所有東西
  return {
    searchTerm,
    filteredPhotos,
    selectedPhoto,
    handleSearchChange,
    handlePhotoClick,
    handleCloseModal
  };
}