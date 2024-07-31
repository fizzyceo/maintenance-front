import { create } from "zustand";
import { axiosHelper } from "./helpers";
import { filterNonFalseValues } from "./helpers/Utlis";

export const useDriverStore = create((set, get) => ({
  drivers: [],
  isLoading: false,
  isError: false,
  error: undefined,
  filters: {
    code: "",
    DestProv: "",
    dateFrom: "",
    dateTo: "",
    access: "",
    driverId: "",
    charger: false,
  },
  // Methods
  getDrivers: async (filters) => {
    set({ filters: filterNonFalseValues(filters) });
    console.log(filterNonFalseValues(filters));
    const body = {
      // search: filterNonFalseValues(filters) || "",
      ...filters,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
    };
    console.log(body);
    set({ isLoading: true });
    let response = await axiosHelper.post("/system/driver/get", body);
    console.log(response);
    if (!response.result) {
      return;
    }
    // console.log(response.data);
    console.log(response.data);
    set({ drivers: response.data, isLoading: false });

    set({ isLoading: false });
  },
  setFilters: (filters) => {
    set({ filters: filterNonFalseValues(filters) });
  },
  deleteDriver: async (driverId) => {
    set({ isLoading: true });

    let res = await axiosHelper.delete(`/system/driver/delete/${driverId}`);

    set({ isLoading: false });
  },
}));
