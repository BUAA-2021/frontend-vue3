<template>
  <span v-if="teamId == 0">请选择当前团队</span>
  <span v-else>
    当前团队：
    <el-avatar :size="40" :src="teamInfo.logo"></el-avatar>
    {{ teamInfo.name }}
  </span>
  <el-popover placement="bottom" trigger="click">
    <template #reference>
      <span>
        <el-icon @click="getTeamList"><Switch /></el-icon>
      </span>
    </template>
    <el-scrollbar max-height="200px">
      <p
        v-for="(item, index) in teamList"
        :key="index"
        class="scrollbar-demo-item"
        @click="teamId = item.id"
      >
        <span>
          <el-avatar :size="40" :src="item.logo"></el-avatar>
          {{ item.name }}
        </span>
      </p>
    </el-scrollbar>
  </el-popover>
</template>

<script setup>
import { useStateStore } from "../../stores/state";
import { useRouter, useRoute } from "vue-router";
import { Team } from "../../api/team";
const router = useRouter();
const route = useRoute();
const state = useStateStore();
const teamId = ref(localStorage.getItem("teamId"));
const teamInfo = reactive({
  id: 0,
  logo: "/favicon.ico",
  name: "",
});
let teamList = ref([]);

function getTeamList() {
  console.log("getTeamList");
  Team.getTeamList()
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        console.log(res.data);
        teamList.value = res.data.teams;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

watch(
  () => teamId.value,
  (newValue) => {
    localStorage.setItem("teamId", newValue);
    let data = new FormData();
    console.log(newValue);
    data.append("id", newValue);
    Team.getTeamInfo(data)
      .then((res) => {
        console.log("getTeamInfo", res);
        teamInfo.id = newValue;
        teamInfo.logo = res.data.logo;
        teamInfo.name = res.data.name;
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        router.push(`/team/${newValue}`);
      });
  },
  { immediate: true }
);

onMounted(() => {
  state.userAvatar = localStorage.getItem("userAvatar");
});
</script>

<style scoped>
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
