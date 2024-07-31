import { create } from "zustand";
import { axiosHelper } from "./helpers";
import { filterNonFalseValues } from "./helpers/Utlis";

export const useDevicesStore = create((set, get) => ({
  devices: [],
  isLoading: false,
  isError: false,
  error: undefined,
  filters: null,
  resultsCount: undefined,
  // Methods
  getDevices: async (filters) => {
    set({ filters: filterNonFalseValues(filters) });
    //
    // const body = {
    //   search: filterNonFalseValues(filters)?.search,
    //   // sortDirection: "desc",
    //   // sortField: "createdAt",
    //   // dateFrom: "",
    //   // dateTo: "",
    //   page: filters?.page || 1,
    //   limit: filters?.perPage || 10,
    // };

    //
    try {
      set({ isLoading: true });
      let response = await axiosHelper.post(
        "/system/device/get",
        get().filters
      );

      if (!response.result) {
        return;
      }
      //

      set({
        devices: response.data,
        resultsCount: response.count,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  createDevice: async (body) => {
    body.lastOnline = new Date();
    set({ isLoading: true });
    try {
      let response = await axiosHelper.post("/system/device/create", body);
      if (!response.result) {
        return;
      }
      get().getDevices();
      return response.result;
    } catch (error) {
      return error.response.data.message;
    } finally {
      set({ isLoading: false });
    }
  },
  editDevice: async (id, body) => {
    // console.log(id)
    // set({ isLoading: true });
    try {
      let response = await axiosHelper.put(`/system/device/update/${id}`, body);
      if (!response.result) {
        return;
      }
      // get().fetchTenants(get().filters);
      get().getDevices();

      // set((state) =>(state.devices = state.devices.map((device) => device._id === id ? response.data : device)) )
      return response;
    } catch (error) {
      return error.response.data.message;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteDevice: async (id) => {
    //
    // set({ isLoading: true });
    try {
      let response = await axiosHelper.delete(`/system/device/delete/${id}`);
      if (!response.result) {
        return;
      }
      // get().fetchTenants(get().filters);
      // get().getDevices();
      set(
        (state) =>
          (state.devices = state.devices.filter((device) => device._id !== id))
      );
      return response;
    } catch (error) {
      return error.response.data.message;
    } finally {
      set({ isLoading: false });
    }
  },
}));
