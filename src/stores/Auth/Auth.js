import { create } from "zustand";
import { axiosHelper, tokenHelper } from "../helpers";

export const useAuth = create((set) => ({
  user: tokenHelper.getUser(),
  accessToken: tokenHelper.getToken(),
  isLoading: null,
  error: null,
  errorMsg: null,

  login: async (data, router) => {
    console.log(router, data);
    set({ isLoading: true, errorMsg: null });
    try {
      const response = await axiosHelper.post("/auth/system/login", data);
      if (!response.result) {
        return;
      }
      //the access token is generated on this endpoint
      tokenHelper.setToken(response.accessToken);
      tokenHelper.setUser(response.data);
      set({ user: response.data, accessToken: response.accessToken });
      navigateAfterLogin(response.data.tempPassword, router);
    } catch (error) {
      set({ errorMsg: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    tokenHelper.removeToken();
    tokenHelper.removeUser();
  },

  resetPassword: async (newPassword, router) => {
    try {
      set({ isLoading: true });
      const response = await axiosHelper.put("/auth/system/reset-password", {
        password: newPassword,
      });
      if (response.result) {
        set((state) => ({ ...state, user: (state.user.tempPassword = false) }));
        router.navigate("/");
      }
    } catch (error) {
      console.log(error);
      // router.navigate("/login",);
    } finally {
      set({ isLoading: false });
    }
  },
}));

const navigateAfterLogin = (tempPassword, router) => {
  if (tempPassword === true) {
    router.navigate("/reset-password");
    return;
  }
  router.navigate("/");
};

const navigateAfterResetPassword = (x, router) => {};
