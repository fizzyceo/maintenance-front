/* eslint-disable no-debugger */
import { create } from "zustand";

export const useLanguageStore = create((set, get) => ({
  currentLang: "en",
  isRtl: false,

  setCurrentLanguage: (lang) => {
    set({ currentLang: lang });
    if (lang === "ar") {
      set({ isRtl: true });
    } else {
      set({ isRtl: false });
    }
  },
}));
