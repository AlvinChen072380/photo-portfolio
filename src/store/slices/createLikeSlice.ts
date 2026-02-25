import { StateCreator } from "zustand";
import { AppState} from "../useAppStore";

export interface LikesSlice {
  likes: Record<string, boolean>;
  toggleLike: (id: string) => void;
  initLikes: (storedLikes: Record<string, boolean>) => void;
}

export const createLikesSlice: StateCreator<AppState, [], [], LikesSlice> = (set) => ({
  likes: {},
  toggleLike: (id) =>
    set((state: LikesSlice) => ({
      likes: { ...state.likes, [id]: !state.likes[id] },
    })),
    initLikes: (storedLikes) => set({ likes: storedLikes }),//語法：set( { 欄位名稱: 新的值 } )
})