import { create } from "zustand";
import { axiosHelper } from "./helpers";
import { filterNonFalseValues } from "./helpers/Utlis";

export const useAssetsStore = create((set, get) => ({
  assets: [],
  isLoading: false,
  isError: false,
  error: undefined,
  filters: null,
  resultsCount: undefined,
  // Methods
  getAssets: async (filters) => {
    // set({ filters: filterNonFalseValues(filters) });
    //
    const body = {
      search: filterNonFalseValues(filters)?.search,
      // sortDirection: "desc",
      // sortField: "createdAt",
      // dateFrom: "",
      // dateTo: "",
      page: filters?.page || 1,
      limit: filters?.perPage || 10,
    };

    //
    try {
      set({ isLoading: true });
      let response = await axiosHelper.post("/system/asset/get", body);

      if (!response.result) {
        return;
      }
      //

      set({
        assets: response.data,
        resultsCount: response.count,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  createasset: async (body) => {
    body.lastOnline = new Date();
    set({ isLoading: true });
    try {
      let response = await axiosHelper.post("/system/asset/create", body);
      if (!response.result) {
        return;
      }
      get().getAssets();
      return response.result;
    } catch (error) {
      return error.response.data.message;
    } finally {
      set({ isLoading: false });
    }
  },
  editAsset: async (id, body) => {
    // console.log(id)
    // set({ isLoading: true });
    try {
      let response = await axiosHelper.put(`/system/asset/update/${id}`, body);
      if (!response.result) {
        return;
      }
      // get().fetchTenants(get().filters);
      get().getAssets();

      // set((state) =>(state.assets = state.assets.map((asset) => asset._id === id ? response.data : asset)) )
      return response;
    } catch (error) {
      return error.response.data.message;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteAsset: async (id) => {
    //
    // set({ isLoading: true });
    try {
      let response = await axiosHelper.delete(`/system/asset/delete/${id}`);
      if (!response.result) {
        return;
      }
      // get().fetchTenants(get().filters);
      // get().getAssets();
      set(
        (state) =>
          (state.assets = state.assets.filter((asset) => asset._id !== id))
      );
      return response;
    } catch (error) {
      return error.response.data.message;
    } finally {
      set({ isLoading: false });
    }
  },
}));
