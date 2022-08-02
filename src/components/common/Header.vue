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
        <el-switch v-model="isDark" style="margin-top: 4px" />
      </el-col>
      <el-col :span="3">
        <el-dropdown>
          <el-avatar
            :size="40"
            src="https://s1.328888.xyz/2022/08/01/FSOsm.jpg"
          ></el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="toProfile">个人中心</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
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
import { useDark } from "@vueuse/core";
import { useStateStore } from "../../stores/state";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const isDark = useDark();
const state = useStateStore();
function logout() {
  state.logoutAction();
  router.push("/user/login");
}
function toHome() {
  router.push("/");
}
function toProfile() {
  router.push("/user/profile");
}
</script>

<style scoped>
.header {
  height: 5vh;
  border-bottom: 1px solid var(--el-border-color);
}
</style>
