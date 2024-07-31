import { create } from "zustand";
import { axiosHelper } from "./helpers";

export const useTenantsStore = create((set, get) => ({
  tenants: [],
  isLoading: false,
  isError: false,
  error: undefined,
  tenantLoading: false,
  filters: null,
  // Methods
  fetchTenants: async (filters) => {
    set({ filters: filters });

    const body = {
      // search: search,
      // sortDirection: "desc",
      // sortField: "createdAt",
      // dateFrom: "",
      // dateTo: "",
      ...filters,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
    };

    try {
      set({ isLoading: true });
      let response = await axiosHelper.post(
        "/system/manage-tenants/get/tenants",
        body
      );

      if (!response.result) {
        return;
      }
      // console.log(response.data);

      set({ tenants: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  getTenant: async (id) => {
    try {
      set({ tenantLoading: true });
      let response = await axiosHelper.get(
        `/system/manage-tenants/get/tenant/${id}`
      );

      if (!response.result) {
        return;
      }
      set({ tenantLoading: false });
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      set({ tenantLoading: false });
    }
  },

  createTenant: async (tenantData) => {
    const body = tenantData;
    set({ isLoading: true });
    try {
      let response = await axiosHelper.post(
        "/system/manage-tenants/create/tenant",
        body
      );
      if (!response.result) {
        return;
      }
      get().fetchTenants(get().filters);
      return response;
    } catch (error) {
      return error.response.data.message;
    } finally {
      set({ isLoading: false });
    }
  },
  updateTenant: async (id, tenantUpdateData) => {
    const body = tenantUpdateData;
    set({ isLoading: true });
    try {
      let response = await axiosHelper.put(
        `/system/manage-tenants/update/tenant/${id}`,
        body
      );
      if (!response.result) {
        return;
      }
      get().fetchTenants(get().filters);
      return response;
    } catch (error) {
      return error.response.data.message;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTenant: async (tenantId) => {
    set({ isLoading: true });
    try {
      let response = await axiosHelper.put(
        `/system/manage-tenants/delete/tenant/${tenantId}`
      );
      if (!response.result) {
        return;
      }
      get().fetchTenants(get().filters);
      return response;
    } catch (error) {
      return error.response.data.message;
    } finally {
      set({ isLoading: false });
    }
  },

  suspendTenant: async (tenantId) => {
    let url = `/system/manage-tenants/suspend/tenant/${tenantId}`;
    set({ isLoading: true });
    try {
      let response = await axiosHelper.put(url);
      if (!response.result) {
        return;
      }
      get().fetchTenants(get().filters);
      return response.result;
    } catch (error) {
      return error.response.data.message;
    } finally {
      set({ isLoading: false });
    }
  },
  activateTenant: async (tenantId) => {
    let url = `/system/manage-tenants/activate/tenant/${tenantId}`;
    set({ isLoading: true });
    try {
      let response = await axiosHelper.put(url);
      if (!response.result) {
        return;
      }
      get().fetchTenants(get().filters);
      return response.result;
    } catch (error) {
      return error.response.data.message;
    } finally {
      set({ isLoading: false });
    }
  },
}));
