<template>
  <template v-if="route.name=='prototypePreview'">
    <el-container class="wraptemp">
    <SideBar sideBarType="doc" />
    <router-view :key="route.fullPath" />
  </el-container>
  </template>
  <template v-else>
  <el-container class="wrap">
    <SideBar sideBarType="doc" />
    <router-view :key="route.fullPath" />
  </el-container>
  </template>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
</script>

<style scoped>
.wrap {
  background-color: #f8fefc;
  width: 100%;
  height: 94%;
  opacity: 0.9;
  backdrop-filter: blur(20px);
  transition: 0.3s;
}
.wraptemp{
  background-color: #f8fefc;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  backdrop-filter: blur(20px);
  transition: 0.3s;
}
SideBar {
  z-index: 10;
  position: absolute;
  top: 30px;
  left: 30px;
}
</style>
