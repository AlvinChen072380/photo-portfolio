// src/app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

// 設定圖片尺寸
//export const runtime = 'edge';
export const alt = 'Magic Portfolio Preview';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX 元素
      // 這裡只能使用簡單的 CSS (類似 Flexbox)
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom right, #1a1a1a, #000000)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* 背景裝飾 */}
        <div style={{
            position: 'absolute',
            top: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            filter: 'blur(80px)',
        }} />

        {/* 主標題 */}
        <div style={{ fontWeight: 800, letterSpacing: '-0.05em' }}>
          Magic Shop
        </div>

        {/* 副標題 */}
        <div style={{ fontSize: 40, marginTop: 30, opacity: 0.8, fontWeight: 300 }}>
          Performance & Art
        </div>
        
        {/* 底部標籤 */}
        <div style={{
            position: 'absolute',
            bottom: 60,
            fontSize: 24,
            background: '#333',
            padding: '10px 30px',
            borderRadius: 50,
            display: 'flex',
            alignItems: 'center',
        }}>
            Next.js 16 • React 19 • Virtualization
        </div>
      </div>
    ),
    // ImageResponse 選項
    {
      ...size,
    }
  );
}