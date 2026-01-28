import { useStore } from "../store"

const Navigation = () => {
  // 只針對開啟以及切換的函式抓取
  const toggleMenu = useStore((state) => state.toggleMenu);
  const isMenuOpen = useStore((state) => state.isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full p-5 flex justify-between items-center z-50 bg-white/80 backdrop-blur-sm">
      <h1 className="text-xl font-bold">My Portfolio</h1>

      {/* 漢堡選單按鈕 */}
      <button
        onClick={toggleMenu}
        className="px-4 py-2 bg-black/60 text-white rounded-full hover:bg-gray-800 transition cursor-pointer"
       >
        {isMenuOpen ? "關閉 Close" : "選單 Menu"}
      </button>
    </nav>
  );
};

export default Navigation;