<template>
  <el-container class="wrap">
    <SideBar sideBarType="team" />
    <el-main>
      <div class="main">
        <router-view />
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStateStore } from "../../stores/state.js";
const route = useRoute();
const state = useStateStore();
onMounted(()=>{
  state.getUserInfo();
})
const router = useRouter();
</script>

<style scoped>
.wrap {
  background-color: #f8fefc;
  width: 100%;
  min-height: 92%;
  height: auto;
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
  margin-top: 2%;
}
</style>
