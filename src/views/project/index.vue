<template>
  <el-container class="wrap">
    <SideBar sideBarType="project" />
    <el-main>
      <router-view :key="route.fullPath" />
    </el-main>
  </el-container>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStateStore } from "../../stores/state.js";
const route = useRoute();
const router = useRouter();
const state = useStateStore();
onMounted(()=>{
  state.getUserInfo();
})
</script>

<style scoped>
.wrap {
  background-color: #f8fefc;
  width: 100%;
  height: 92%;
  opacity: 0.9;
  backdrop-filter: blur(20px);
  transition: 0.3s;
}
sideBar {
  z-index: 10;
  position: absolute;
  top: 30px;
  left: 30px;
}
.main {
  margin-left: 5%;
  margin-top: 5%;
}
</style>
