<template>
  <el-container class="wrap">
    <SideBar sideBarType="team"/>
    <el-main>
      <div class="main">
        <router-view/>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import TeamInfoViewVue from './TeamInfoView.vue';
import { useRouter,useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const activeTab = ref(route.name);
watch((activeTab),(val)=>{
    console.log(`/team/${route.params.teamID}/${val}`);
    router.push(`/team/${route.params.teamID}/${val}`);
});
</script>

<style scoped>
.wrap {
  background-color: #f8fefc;
  width: 100%;
  height: 100%;
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