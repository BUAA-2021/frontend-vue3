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
      useStorage("token", userToken);
      this.userName = userName;
      this.userToken = userToken;
      this.userId = userId;
      this.userEmail = userEmail;
      this.userAvatar = userAvatar;
    },
    logoutAction() {
      const token = useStorage("token");
      token.value = null;
      this.userName = "";
      this.userToken = "";
      this.userId = "";
      this.userEmail = "";
      this.userAvatar = "";
    },
  },
});
