import { StateCreator } from "zustand";

// User 的資料形狀 (考量未來擴充性)
type UserData = {
  name: string;
  email: string;
}

export interface UserSlice {
  user: UserData | null;

  isLoggedIn: boolean;
  // API 流程狀態 Async Action
  isLoading: boolean;
  error: string | null;

  // Actions
  // 加入 Promise 配合 async
  login: (name: string, email: string) => Promise<void>;
  logout: () => void;
}

// Slice 實作邏輯
export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  //預設值的樣子
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,

  login: async(name, email) => {
    // 立刻將設定改為載入中，並清空舊錯誤
    set({ isLoading: true, error: null });

    try {
      // 模擬 API 請求 (等待1秒)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 更新使用者資料，並關閉Loading
      set({
        user:{ name, email },        
        isLoggedIn: true,
        isLoading: false
      });

    } catch (err: unknown) {
      console.log("發生錯誤詳細資訊", err);      
      // 假設讀取失敗，設定錯誤訊息，並關閉 Loading
      set({ error: "登入失敗", isLoading: false });
    }
  },

  logout: () => set ({
    user: null,
    isLoggedIn: false,
    error: null
  }),
});