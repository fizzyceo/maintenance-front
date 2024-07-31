import moment from "moment";
import { create } from "zustand";

export const useDatePickerStore = create((set, get) => ({
  selectedDates: [],
  isLoading: false,
  isError: false,

  // Methods
  setSelectedDates: async (body) => {
    try {
      set({
        selectedDates: body,

        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  init: () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    set({ selectedDates: [formattedDate, formattedDate] });
  },
}));
