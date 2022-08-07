<template>
  这是team总路由
  <el-tabs v-model="activeTab">
  <el-tab-pane label="团队信息" name="teamInfo">
    </el-tab-pane>
    <el-tab-pane label="项目管理" name="projectManage">
    </el-tab-pane>
    <el-tab-pane label="文档中心" name="documentCenter">
    </el-tab-pane>
  </el-tabs>
  <router-view/>
</template>

<script setup>
import TeamInfoViewVue from './TeamInfoView.vue';
import { useRouter,useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const activeTab = ref('teamInfo');
watch((activeTab),(val)=>{
    console.log(`/team/${route.params.teamID}/${val}`)
    router.push(`/team/${route.params.teamID}/${val}`);
});
</script>

<style>

</style>