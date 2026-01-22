import { SceneType } from "@/src/data/backgrounds";
import { StateCreator } from "zustand";
import { AppState } from "../useAppStore";


export interface BackgroundSlice {
  currentScene: SceneType;
  setScene: (scene: SceneType) => void;
}

export const createBackgroundSlice: StateCreator<AppState, [], [], BackgroundSlice> = (set) => ({
  currentScene: 'shire',
  setScene: (scene) => set({ currentScene: scene }),
});