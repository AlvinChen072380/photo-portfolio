import { StateCreator } from "zustand";
import { Photo } from "@/src/data/photo";

// 1.定義購物車內的單一商品結構
export interface CartItem {
  photo: Photo;
  quantity: number;
}

// 2. 定義 Slice 的介面 (狀態 + 動作)
export interface CartSlice {
  cart: CartItem[];
  isCartOpen: boolean; // 購物車UI開關

  addToCart: (photo: Photo) => void;
  removeFromCart: (photoId: string) => void;
  
  increaseQuantity: (photoId: string) => void;
  decreaseQuantity: (photoId: string) => void;

  clearCart: () => void; // 不接收任何參數也沒有回傳值

  initCart: (storedCart: CartItem[]) => void;

  openCart: () => void;
  closeCart: () => void;
}

// 3. 實作邏輯

export const createCartSlice: StateCreator<any, [], [], CartSlice> = (set) => ({
  cart: [], // 購物車初始為空陣列
  isCartOpen: false,

  addToCart: (photo) =>
    set((state: CartSlice) => {
      // A: 先檢查購物車內有沒有這張照片
      const existingItem = state.cart.find((item) => item.photo.id === photo.id);

     /*  if (existingItem) {
        // B. 如果有， 數量 + 1
        // 注意: 我們要回傳一個新的陣列
        return {
          cart: */ 
          const newCart = existingItem
            ? state.cart.map((item) =>
              item.photo.id === photo.id
                ? {...item, quantity: item.quantity + 1}
                : item
          )
          : [...state.cart, { photo, quantity: 1 }];
      

      /* // C. 如果沒有，新增一個項目 (數量設為 1)
      return {
        cart: [...state.cart, { photo, quantity: 1 }];
      }; */
      return {
        cart: newCart,
        /* isCartOpen: true */
      };
    }),

    increaseQuantity: (photoId) => 
      set((state: CartSlice) => ({
        cart: state.cart.map((item) =>
          item.photo.id === photoId
            ? {...item, quantity: item.quantity + 1}
            : item
        ),
      })),

    decreaseQuantity: (photoId) => 
      set((state: CartSlice) => ({
        cart: state.cart.map((item) => {
          if (item.photo.id === photoId) {
            return {...item, quantity: item.quantity - 1}
          }
          return item;
        })
        // 過濾掉數量變成 0 的項目 (自動刪除)
        // 這是常見的 UX：減到 0 就消失
        .filter((item) => item.quantity > 0),
    })),

    removeFromCart: (photoId) =>
      set((state: CartSlice) => ({
        // 過濾掉 id 符合的項目
        cart: state.cart.filter((item) => item.photo.id !== photoId),
      })),

      clearCart: () => set({ cart: [] }),

      initCart: (storedCart) => set({ cart: storedCart }),

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
});