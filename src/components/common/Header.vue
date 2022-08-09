<template>
  <div class="header">
    <el-row>
      <el-col :span="2">
        <div class="right">
          <img src="..\..\assets\iconmiaomiao.png" />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="title"><span class="title">MOSHU</span></div>
      </el-col>
      <el-col :span="15">
        <span v-if="teamId == 0">请选择当前团队</span>
        <span v-else>
          当前团队：
          <el-avatar :size="40" :src="state.currentTeam.logo"></el-avatar>
          {{ state.currentTeam.name }}
        </span>
        <el-popover placement="bottom" trigger="click">
          <template #reference>
            <span>
              <el-icon @click="getTeamList"><Switch /></el-icon>
            </span>
          </template>
          <el-scrollbar max-height="200px">
            <p
              v-for="(item, index) in state.teamList"
              :key="index"
              class="scrollbar-demo-item"
              @click="changeTeam(item)"
            >
              <span>
                <el-avatar :size="40" :src="item.logo"></el-avatar>
                {{ item.name }}
              </span>
            </p>
          </el-scrollbar>
        </el-popover>
      </el-col>
      <el-col :span="3">
        <el-dropdown>
          <el-avatar :size="40" :src="state.userAvatar"></el-avatar>
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
const teamId = ref(route.params.teamID||route.query.teamID);
function changeTeam(item) {
  console.log("ITEM",item);
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
  height: 8vh;
  border-bottom: 1px solid var(--el-border-color);
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
  margin-top: 1%;
  margin-left: -1%;
  font-size: 35px;
  color: white;
  font-weight: 600;
  font-family: consolas;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
