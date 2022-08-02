import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { ElMessage } from "element-plus";
import router from "../router";
export const useStateStore = defineStore("userState", {
  state: () => ({
    userNickname: "",
    userRealname: "",
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
      const {
        userNickname,
        userRealname,
        userToken,
        userId,
        userEmail,
        userAvatar,
      } = payload;
      localStorage.token = userToken;
      localStorage.setItem("token", JSON.stringify(userToken));
      this.userNickname = userNickname;
      this.userRealname = userRealname;
      this.userId = userId;
      this.userEmail = userEmail;
      this.userAvatar = userAvatar;
      this.isLoggedIn = true;
    },
    logoutAction() {
      const token = useStorage("token");
      console.log("TOKEN", token);
      token.value = null;
      this.userNickname = "";
      this.userRealname = "";
      this.userId = "";
      this.userEmail = "";
      this.userAvatar = "";
      this.isLoggedIn = false;
      router.push("/user/login");
      ElMessage.success("退出登录！");
    },
  },
});
