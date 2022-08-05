<template>
  <el-container class="wrap">
    <SideBar />
    <template v-if="loading">
      <Loading />
    </template>
    <el-main v-else class="main0">
      <div class="main">
        <el-row>
          <el-col
            v-for="(item, index) in teamList"
            :key="item"
            :span="4"
            :offset="1"
          >
            <el-card
              style="border: 0px"
              shadow="always"
              :body-style="{ padding: '0px' }"
              class="card"
            >
              <div class="cardimg">
                <img :src="item.logo" fit="fill" />
              </div>
              <div style="padding: 14px">
                <span>{{ item.name }}</span>
                <div class="bottom">
                  <time class="time">{{ item.founder }}</time>
                  <el-button text class="button" @click="toTeamInfo(item.id)"
                    >进入团队</el-button
                  >
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { onMounted } from "vue";
import { Team } from "../../api/team.js";
import { Picture as IconPicture } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const loading = ref(true);
const router = useRouter();
let teamList = ref([
  // {
  //   name: "test",
  //   id: 1,
  //   logo: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
  //   founder: "ando",
  // },
  // {
  //   name: "test",
  //   id: 1,
  //   logo: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
  //   founder: "ando",
  // },
]);

function toTeamInfo(id) {
  router.push({
    path: "/teamInfo",
    query: {
      id: id,
    },
  });
}

function getTeamList() {
  Team.getTeamList()
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        console.log(res.data);
        teamList.value = res.data.teams;
        loading.value = false;
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("获取当前用户信息失败");
    });
}

onMounted(() => {
  getTeamList();
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
  margin-left: 15%;
  margin-top: 1%;
}
</style>

<style scoped>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
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
.demo-image__error .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image__error .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.demo-image__error .el-image {
  padding: 0 5px;
  max-width: 300px;
  max-height: 200px;
  width: 100%;
  height: 200px;
}

.demo-image__error .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.card {
  margin-top: 4vh;
  height: "5vh";
}

.cardimg {
  width: 100%;
  height: 150px;
}

.cardimg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
