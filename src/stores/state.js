import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { ElMessage } from "element-plus";
import router from "../router";
import { Team } from "../api/team.js";
export const useStateStore = defineStore("userState", {
  state: () => ({
    userNickname: "匿名",
    userRealname: "匿名",
    isLoggedIn: false,
    userToken: "",
    userId: "",
    userEmail: "",
    userAvatar: "",
    currentTeam: {
      id: 0,
      logo: "http://101.42.173.97:8000/media/df42a0a0ae288c7266db9c846a054f71_2022年08月08日14时26分.jpg",
      name: "",
    },
    teamList:[],
  }),
  getters: {
    getUserName: (state) => state.userName,
    getCurrentTeam: (state) =>{
      console.log(localStorage.getItem("currentTeam"))
      state.currentTeam = localStorage.getItem("currentTeam");
      return state.currentTeam;
    },
    getTeamList: (state) =>{
      state.teamList = localStorage.getItem("teamList");
      return state.teamList;
    }
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
      localStorage.setItem("userId", JSON.stringify(userId));
      localStorage.setItem("userAvatar", userAvatar);
      localStorage.setItem("userNickname", JSON.stringify(userNickname));
      localStorage.setItem("userRealname", JSON.stringify(userRealname));
      this.userNickname = userNickname;
      this.userRealname = userRealname;
      this.userId = userId;
      this.userEmail = userEmail;
      this.userAvatar = userAvatar;
      this.isLoggedIn = true;
    },
    logoutAction() {
      this.userNickname = "匿名";
      this.userRealname = "匿名";
      this.userId = "";
      this.userEmail = "";
      this.userAvatar = "/favicon.ico";
      this.isLoggedIn = false;
      this.currentTeam = {};
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.setItem("userAvatar", this.userAvatar);
      localStorage.removeItem("userNickname");
      localStorage.removeItem("userRealname");
      ElMessage.success("退出登录！");
    },
    setCurrentTeam(payload) {
      this.currentTeam = payload;
      localStorage.setItem("currentTeam", JSON.stringify(payload));
    },
    setTeamList(payload) {
      this.teamList = payload;
      localStorage.setItem("teamList", JSON.stringify(payload));
    }
  },
});
