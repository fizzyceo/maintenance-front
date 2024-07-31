import { create } from "zustand";
import { axiosHelper } from "./helpers";
// import { filterNonFalseValues } from "./helpers/Utlis";

export const useStaffStore = create((set, get) => ({
  staffs: [],
  isLoading: false,
  isError: false,
  error: undefined,
  filters: null,
  // Methods
  getStaffs: async () => {
    // set({ filters: filterNonFalseValues(filters) });
    // console.log(filterNonFalseValues(filters))
    const body = {
      // search: filterNonFalseValues(filters)?.search,
      // sortDirection: "desc",
      // sortField: "createdAt",
      // dateFrom: "",
      // dateTo: "",
      // page: filters?.page || 1,
      // limit: filters?.limit || 10,
    };

    try {
      set({ isLoading: true });
      let response = await axiosHelper.post(
        "/system/manage-staff/get/staffs",
        body
      );

      if (!response.result) {
        return;
      }
      // console.log(response.data);

      set({ staffs: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
