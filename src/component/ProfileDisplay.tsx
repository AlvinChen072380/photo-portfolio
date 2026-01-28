import { useEffect, useRef, memo } from 'react'; // 1. 引入 memo
import { useStore } from '../store';

const ProfileDisplay = () => {
  const user = useStore((state) => state.user); //***重要改動 原子化選取 */
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`🟢 [GoodUserDisplay] 渲染了第 ${renderCount.current} 次`);
  });

  return (
    <div style={{ border: '2px solid green', padding: '10px', margin: '10px' }}>
      <h3>🟢 效能優良的組件</h3>
      <p>使用者名稱: {user?.name || "未登入"}</p>
      <p>請觀察 Console (F12)</p>
    </div>
  );
};

// 2. 這裡用 memo 包起來匯出
export default memo(ProfileDisplay);