import { create } from "zustand";

export const useConfirmDialogStore = create((set, get) => ({
  isOpen: false,
  isConfirmed: false,
  confirmCB: null,
  cancelCB: null,
  title: "",
  question: "",

  toggle: () => {
    set((state) => ({ isOpen: !state.isOpen, isConfirmed: false }));
    get().cancelCB();
  },

  showConfirm: (confirmCB = () => {}, cancelCB = () => {}, title, question) => {
    set({
      isOpen: true,
      confirmCB: confirmCB,
      cancelCB: cancelCB,
      title: title,
      question: question,
    });
  },
  confirm: () => {
    set((state) => ({ isOpen: false, isConfirmed: true }));
    get().confirmCB();
  },
}));
