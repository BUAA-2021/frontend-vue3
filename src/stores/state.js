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
    teamList: [],
    teamId: 0,
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
      Team.getTeamList()
        .then((res) => {
          if (res.status == 200) {
            this.teamList = res.data.teams;
            if (this.teamList.length > 0) {
              this.teamId = this.teamList[0].id;
            } else {
              this.teamId = 0;
            }
            localStorage.setItem("teamId", JSON.stringify(this.teamId));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logoutAction() {
      this.userNickname = "匿名";
      this.userRealname = "匿名";
      this.userId = "";
      this.userEmail = "";
      this.userAvatar = "/favicon.ico";
      this.isLoggedIn = false;
      this.teamId = 0;
      this.teamList = ref([]);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.setItem("userAvatar", this.userAvatar);
      localStorage.setItem("teamId", 0);
      localStorage.removeItem("userNickname");
      localStorage.removeItem("userRealname");
      ElMessage.success("退出登录！");
    },
  },
});
