import { create } from "zustand";
import { createUserSlice, UserSlice } from "./slices/userSlice";
import { createCounterSlice, CounterSlice } from "./slices/counterSlice";
import { createUISlice, UISlice } from "./slices/uiSlice";
import {
  persist,
  createJSONStorage,
  subscribeWithSelector,
} from "zustand/middleware"; // middleware 引入
import { createCursorSlice, CursorSlice } from "./slices/cursorSlice";

type MyStore = UserSlice & CounterSlice & UISlice & CursorSlice;

// cerate<MyStore>()( persist( (...) => ({...}), Options ) )
export const useStore = create<MyStore>()(
  subscribeWithSelector( // 要加入subscribeWithSelector 中間層，才能讓subscribe接收兩個參數
    persist(
      (...a) => ({
        ...createUserSlice(...a),
        ...createCounterSlice(...a),
        ...createUISlice(...a),
        ...createCursorSlice(...a),
      }),
      {
        name: "my-app-storage", // localStorage 裡的 Key 名稱
        storage: createJSONStorage(() => localStorage), // 選填:指定使用localStorage

        // 進階設定 (Optional)
        // 這個部分可以決定 "誰要被存起來"
        // 如果部寫這個部分，預設會把 User & Counter 的所有資料都存入
        // 但通常不存 isLoading (因為重整網頁時不應該顯示 Loading)
        partialize: (state) => ({
          user: state.user,
          isLoggedIn: state.isLoggedIn,
          count: state.count,
          // ⚠️ 注意：通常 UI 狀態 (isMenuOpen) 不需要被持久化存起來
          // 如果你希望重整後選單維持開啟，可以加進來；否則這裡不用動，讓它預設 false
        }),
      },
    ),
  ),
);
