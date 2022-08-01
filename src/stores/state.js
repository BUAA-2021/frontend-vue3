import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
export const useStateStore = defineStore("userState", {
  state: () => ({
    userName: "",
    isLoggedIn: false,
    userToken: "",
    userId: "",
    userEmail: "",
    userAvatar: "",
  }),
  getters: {
    getUserName: (state) => state.userName,
  },
  actions: {
    loginAction(payload) {
      const { userName, userToken, userId, userEmail, userAvatar } = payload;
      useStorage("token", userToken, sessionStorage);
      this.userName = userName;
      this.userId = userId;
      this.userEmail = userEmail;
      this.userAvatar = userAvatar;
      this.isLoggedIn = true;
    },
    logoutAction() {
      const token = useStorage("token");
      token.value = null;
      this.userName = "";
      this.userId = "";
      this.userEmail = "";
      this.userAvatar = "";
      this.isLoggedIn = false;
    },
  },
});
