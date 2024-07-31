import { create } from "zustand";
import { axiosHelper } from "./helpers";
import { filterNonFalseValues } from "./helpers/Utlis";

export const useWilayasStore = create((set, get) => ({
  wilayas: [],
  isLoading: false,
  isError: false,
  error: undefined,
  filters: null,
  resultsCount: undefined,
  // Methods
  getWilayas: async (filters) => {
    // set({ filters: filterNonFalseValues(filters) });

    const body = {
      search: filterNonFalseValues(filters)?.search,
      // sortDirection: "desc",
      // sortField: "createdAt",
      // dateFrom: "",
      // dateTo: "",
      //   page: filters?.page || 1,
      //   limit: filters?.perPage || 10,
    };

    try {
      set({ isLoading: true });
      let response = await axiosHelper.post("/system/wilaya/get", body);

      if (!response.result) {
        return;
      }

      set({
        wilayas: response.data,
        resultsCount: response.count,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
