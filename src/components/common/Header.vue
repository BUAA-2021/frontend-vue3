<template>
  <div class="header">
    <el-row>
      <el-col :span="6">
        <el-image
          src="https://element-plus.gitee.io/images/element-plus-logo.svg"
          fit="contain"
          style="height: 4vh"
        >
        </el-image>
      </el-col>
      <el-col :span="12"> </el-col>
      <el-col :span="3">
        <!-- <el-switch v-model="isDark" style="margin-top: 4px" /> -->
      </el-col>
      <el-col :span="3">
        <el-dropdown>
          <el-avatar :size="40" :src="state.userAvatar"></el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="toProfile">个人中心</el-dropdown-item>
              <el-dropdown-item @click="toHome">返回主页</el-dropdown-item>
              <el-dropdown-item divided @click="logout"
                >退出登录</el-dropdown-item>
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
const state = useStateStore();
function logout() {
  router.push("/user/login");
  state.logoutAction();
}
function toHome() {
  router.push("/");
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
  height: 7vh;
  border-bottom: 1px solid var(--el-border-color);
  background-color: #0662d1;
  opacity: 0.5;
  backdrop-filter: blur(20px);
}
</style>
