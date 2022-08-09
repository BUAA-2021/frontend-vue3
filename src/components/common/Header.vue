<template>
  <div class="header">
    <el-row style="height=100%">
      <el-col :span="2">
        <div class="right">
          <img src="..\..\assets\iconmiaomiao.png" />
        </div>
      </el-col>
      <el-col :span="2" style="font-weight: bold">
        <div class="title"><span>MOSHU</span></div>
      </el-col>
      <el-col :span="2" style="background: white">
        <div class="teamtitle">
          <span v-if="teamId == 0">请选择当前团队</span>
          <span v-else> 当前团队：</span>
        </div>
      </el-col>
      <el-col :span="1" style="background: white">
        <div style="margin-top: 13%">
          <span>
            <el-avatar :size="40" :src="state.currentTeam.logo"></el-avatar>
          </span>
        </div>
      </el-col>
      <el-col :span="2" style="background: white">
        <div style="margin-top: 14%">
          <span style="color: black; font-weight: bold">
            {{ state.currentTeam.name }}
          </span>
          <span> </span>
          <span style="padding-left: 15%">
            <el-popover placement="bottom" trigger="click" :width="200">
              <template #reference>
                <span>
                  <el-icon @click="getTeamList" style="color: #7b91cb"
                    ><Switch
                  /></el-icon>
                </span>
              </template>
              <el-scrollbar max-height="200px" style="overflow-x: hidden">
                <div
                  v-for="(item, index) in state.teamList"
                  :key="index"
                  class="scrollbar-demo-item"
                  @click="changeTeam(item)"
                >
                  <span style="padding: 10px; padding-top: 15px">
                    <el-avatar :size="40" :src="item.logo"></el-avatar>
                  </span>
                  <span style="padding: 10px">
                    {{ item.name }}
                  </span>
                </div>
              </el-scrollbar>
            </el-popover>
          </span>
        </div>
      </el-col>
      <el-col :span="12"> </el-col>
      <el-col :span="3">
        <el-dropdown>
          <el-avatar
            :size="40"
            :src="state.userAvatar"
            style="margin-bottom: 10%"
          ></el-avatar>
          <template v-if="route.path != '/login'" #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="toProfile">个人中心</el-dropdown-item>
              <el-dropdown-item @click="toHome">返回主页</el-dropdown-item>
              <el-dropdown-item divided @click="logout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useStateStore } from "../../stores/state";
import { useRouter, useRoute } from "vue-router";
import { Team } from "../../api/team";
import { $on, $off, $once, $emit } from "../../utils/gogocodeTransfer";
import eventBus from "@/utils/eventBus";
const router = useRouter();
const route = useRoute();
const state = useStateStore();
const teamId = ref(route.params.teamID || route.query.teamID);
function changeTeam(item) {
  console.log("ITEM", item);
  state.setCurrentTeam(item);
  router.push(`/team/${item.id}/teamInfo`);
  $emit(eventBus, "changeTeam", item);
}
function logout() {
  router.push("/");
  state.logoutAction();
}
function toHome() {
  router.push("/team/create");
}
function toProfile() {
  router.push("/user/profile");
}
function getTeamList() {
  Team.getTeamList()
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        state.setTeamList(res.data.teams);
        state.currentTeam = JSON.parse(localStorage.getItem("currentTeam"));
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
onMounted(() => {
  state.userAvatar = localStorage.getItem("userAvatar");
  getTeamList();
});
</script>

<style scoped>
.header {
  height: 8%;
  border-bottom: 2px solid var(--el-border-color);
  background-color: #7b91cb;
  opacity: 0.8;
  backdrop-filter: blur(20px);
}

.right {
  height: 100%;
  vertical-align: middle;
}

img {
  height: 70%;
  margin-top: 3%;
  margin-left: 15%;
}

.el-dropdown {
  margin-top: 6.5%;
}

.title {
  margin-top: 5%;
  margin-left: -1%;
  font-size: 35px;
  color: white;
  font-weight: 600;
  font-family: consolas;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  height: 50px;
  width: 90%;
  margin: 10px;

  border-radius: 8px;
  background: #e8f1f0;
  color: #197c96;
  font-weight: bold;
}

.teamtitle {
  margin-top: 13%;
  margin-left: 12%;
  font-weight: bold;
  font-size: 19px;
  color: #7b91cb;
}
</style>
