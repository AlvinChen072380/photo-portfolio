// src/component/VirtualizedPhotoGrid.tsx
'use client'

import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import { Photo } from "../data/photo";
import PhotoCard from "./PhotoCard";
import { useLayoutEffect, useRef, useState } from "react";

interface Props {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

interface CellData {
  columnCount: number;
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

export default function VirtualizedPhotoGrid({ photos, onPhotoClick }: Props) {
  // 1. 自製 AutoSizer 狀態
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 2. 使用 ResizeObserver 監聽容器大小變化
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // 取得容器的寬高
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const Cell = ({ columnIndex, rowIndex, style, data }: GridChildComponentProps<CellData>) => {
    const { columnCount, photos, onPhotoClick } = data;
    const index = rowIndex * columnCount + columnIndex;

    if (index >= photos.length) return null;

    const photo = photos[index];

    return (
      <div style={style} className="p-2.5">
        <PhotoCard
          photo={photo}
          priority={index < 4}
          onClick={() => onPhotoClick(photo)}
        />
      </div>
    );
  };

  const { width, height } = dimensions;

  return (
    // 3. 綁定 ref 到這個容器
    // min-h-[500px] 確保初始有高度
    <div 
      ref={containerRef} 
      className="flex-1 w-full min-h-150 bg-transparent overflow-hidden" 
      /* style={{ overflow: 'hidden' }} */
    > 
      {/* 4. 只有當寬高 > 0 時才渲染 Grid，避免錯誤 */}
      {width > 0 && height > 0 ? (
        (() => {
          // RWD 邏輯
          const gap = 16;
          let columnCount = 1;

          if (width >= 1280) columnCount = 4;
          else if (width >= 1024) columnCount = 3;
          else if (width >= 640) columnCount = 2;
          else columnCount = 1;          

          const columnWidth = (width - (gap * (columnCount -1 ))) / columnCount;
          // 調整列高 (這裡可以依需求微調 +100 或 +120)
          const rowHeight = columnWidth * 0.80 + 120; 
          const rowCount = Math.ceil(photos.length / columnCount);

          return (
            <Grid
              columnCount={columnCount}
              columnWidth={columnWidth}
              height={height}
              rowCount={rowCount}
              rowHeight={rowHeight}
              width={width}
              itemData={{ columnCount, photos, onPhotoClick }}
              className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              
            >
              {Cell}
            </Grid>
          );
        })()
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Loading Gallery Layout...
        </div>
      )}
    </div>
  );
}