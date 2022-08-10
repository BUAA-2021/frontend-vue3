<template>
  <el-container class="wrap">
    <SideBar />
    <template v-if="loading">
      <Loading />
    </template>
    <el-main v-else class="main0"> </el-main>
  </el-container>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { onMounted } from "vue";
import { Team } from "../../api/team.js";
import { useRouter, useRoute } from "vue-router";
import { $emit } from "../../utils/gogocodeTransfer";
import { useStateStore } from "../../stores/state.js";
const route = useRoute();
const router = useRouter();
const loading = ref(true);
const state = useStateStore();
let code = ref();

function getInvited() {
  code.value = route.params.code;
  let data = new FormData();
  data.append("inviteCode", code.value);
  Team.invitedByCode(data)
    .then((res) => {
      console.log(res);
      if (res.data.status == 200) {
        state.currentTeam = res.data.team;
        router.push({
          path: `/team/${state.currentTeam.id}/teamInfo`,
        });
        loading.value = false;
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("接受邀请失败！");
    });
}

onMounted(() => {
  getInvited();
});
</script>

<style scoped>
h1 {
  font-size: 35px;
  margin-left: 0;
}

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
  margin-left: 10%;
  margin-top: 5%;
}
</style>

<style scoped>
.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.btn {
  padding: 12px 50px;
  color: #063273;
  border: 2px solid #cfe1f7;
  background: #cfe1f7;
  text-align: center;
  height: 35px;
  border-radius: 6px;

  transition: 0.3s linear;
  width: 40%;
  font-weight: 550;
}

.btn:hover {
  background: #063273;
  color: #f2f2f2;
}

.btn2 {
  padding: 12px 50px;
  color: #f25b67;
  border: 2px solid #f25b67;
  background: #f6d2c9;
  text-align: center;
  height: 35px;
  border-radius: 6px;

  transition: 0.3s linear;
  width: 40%;
  font-weight: 550;
}

.btn2:hover {
  background: #f25b67;
  color: #f2f2f2;
}

.btn0 {
  padding: 12px 50px;
  color: #063273;
  border: 2px solid #cfe1f7;
  background: #cfe1f7;

  text-align: center;
  height: 35px;
  border-radius: 6px;

  transition: 0.3s linear;
  width: 20%;
  font-weight: 550;
}

.btn0:hover {
  background: #063273;
  color: #f2f2f2;
}

.btn1 {
  padding: 12px 50px;
  color: #f25b67;
  border: 2px solid #f25b67;
  background: #f6d2c9;
  text-align: center;
  height: 35px;
  border-radius: 6px;

  transition: 0.3s linear;
  width: 20%;
  font-weight: 550;
}

.btn1:hover {
  background: #f25b67;
  color: #f2f2f2;
}
.right {
  width: 300px;
  height: 200px;
  margin-left: 25%;
  margin-top: -25px;
}

.right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
