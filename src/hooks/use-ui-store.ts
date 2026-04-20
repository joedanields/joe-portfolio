import { create } from "zustand";

export type FocusMode = "idle" | "ai-research" | "software-engineering";
export type ThemeMode = "dark" | "midnight";

interface UIState {
  cursorVariant: "default" | "magnetic";
  theme: ThemeMode;
  focusMode: FocusMode;
  setCursorVariant: (variant: UIState["cursorVariant"]) => void;
  setTheme: (theme: ThemeMode) => void;
  setFocusMode: (mode: FocusMode) => void;
}

export const useUIStore = create<UIState>((set) => ({
  cursorVariant: "default",
  theme: "dark",
  focusMode: "idle",
  setCursorVariant: (cursorVariant) => set({ cursorVariant }),
  setTheme: (theme) => set({ theme }),
  setFocusMode: (focusMode) => set({ focusMode }),
}));
