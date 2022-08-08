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
        <select-team />
      </el-col>
      <el-col :span="3">
        <el-dropdown>
          <el-avatar :size="40" :src="state.userAvatar"></el-avatar>
          <template v-if="route.path != '/user/login'" #dropdown>
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
const router = useRouter();
const route = useRoute();
const state = useStateStore();
function logout() {
  router.push("/user/login");
  state.logoutAction();
}
function toHome() {
  router.push("/team/create");
}
function toProfile() {
  router.push("/user/profile");
}
onMounted(() => {
  state.userAvatar = localStorage.getItem("userAvatar");
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
</style>
