import { create } from "zustand";
import { axiosHelper } from "./helpers";
import { filterNonFalseValues } from "./helpers/Utlis";

export const useCompanyStore = create((set, get) => ({
  companies: [],
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
  getCompanies: async (filters) => {
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
    let response = await axiosHelper.post("/system/company/get", body);
    console.log(response);
    if (!response.result) {
      return;
    }
    // console.log(response.data);
    console.log(response.data);
    set({ companies: response.data, isLoading: false });

    set({ isLoading: false });
  },
  setFilters: (filters) => {
    set({ filters: filterNonFalseValues(filters) });
  },
  deleteCompany: async (companyId) => {
    set({ isLoading: true });

    let res = await axiosHelper.delete(`/system/company/delete/${companyId}`);

    set({ isLoading: false });
  },
}));
