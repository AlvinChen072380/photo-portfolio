import { useStore } from "../store";
import { AnimatePresence, motion, Variants } from "framer-motion";


const MenuOverlay = () => {
  const isMenuOpen = useStore((state) => state.isMenuOpen);
  const closeMenu = useStore((state) => state.closeMenu);

 // 動畫設定 ( Variants )
  const menuVariants: Variants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 20 }
    },
    exit: { opacity: 0, y: "-100%", transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-blue-300 z-40 flex flex-col items-center justify-center text-white"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
        >
          <ul className="space-y-8 text-center text-3xl font-bold">
            <li onClick={closeMenu} className="cursor-pointer hover:text-gray-400">Home</li>
            <li onClick={closeMenu} className="cursor-pointer hover:text-gray-400">About</li>
            <li onClick={closeMenu} className="cursor-pointer hover:text-gray-400">Works</li>
            <li onClick={closeMenu} className="cursor-pointer hover:text-gray-400">Contact</li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;