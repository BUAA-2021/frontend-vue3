<template>
  <el-container class="wrap">
    <template v-if="loading">
      <Loading />
    </template>
    <el-main v-else class="main0">
      <el-row>
        <el-col :span="3">
          <el-button type="primary" plain @click="toManage" class="btn"
            >返回上一级</el-button
          >
        </el-col>
        <el-col :span="3">
          <el-button type="primary" plain @click="sortByTime()" class="btn"
            >按时间排序</el-button
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col v-for="item in recycleList" :key="item" :span="5" :offset="1">
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
              <p>简介: {{ item.introduction }}</p>
              <p>创建者：{{ item.founder }}</p>
              <p>删除时间：{{ item.deletedTime }}</p>
              <div class="bottom">
                <el-button
                  type="primary"
                  @click="recoverProject(item.id)"
                  class="btn2"
                  >恢复项目</el-button
                >
                <el-button
                  type="danger"
                  @click="finalDeleted(item.id)"
                  class="btn1"
                  >彻底删除项目</el-button
                >
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script setup>
import { onMounted } from "vue";
import { Project } from "../../api/project.js";
import { useRouter } from "vue-router";
import { timeStamp2String } from "../../utils/timeStamp2String.js";
import { ElMessage } from "element-plus";

const router = useRouter();
let recycleList = ref([]);
let teamId = ref();
const loading = ref(true);
function toManage() {
  router.go(-1);
}
function recoverProject(id) {
  let data = new FormData();
  data.append("projectId", id);

  Project.recoverProject(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        getRecycleList();
        ElMessage.success("恢复项目成功");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("恢复项目失败");
    });
  //some
}

let status = ref(1);
function sortByTime() {
  let data = new FormData();
  data.append("teamId", teamId.value);
  data.append("type", status.value);
  console.log(teamId.value);
  status.value = 1 - status.value;
  Project.recycleSortByTime(data)
    .then((res) => {
      if (res.status == 200) {
        recycleList.value = res.data.projectList;
        for (let i = 0; i < recycleList.value.length; i++) {
          recycleList.value[i].deletedTime = timeStamp2String(
            new Date(res.data.projectList[i].deletedTime).getTime()
          );
        }
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("排序失败！");
    });
}

function finalDeleted(id) {
  let data = new FormData();
  data.append("projectId", id);
  Project.finalDeleted(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        getRecycleList();
        ElMessage.success("彻底删除项目成功");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("彻底删除项目失败");
    });
}

function getRecycleList() {
  teamId.value = router.currentRoute.value.query.teamID;
  let data = new FormData();
  data.append("teamId", teamId.value);
  Project.getRecycleList(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        recycleList.value = res.data.projectList;
        for (let i = 0; i < recycleList.value.length; i++) {
          recycleList.value[i].deletedTime = timeStamp2String(
            new Date(res.data.projectList[i].deletedTime).getTime()
          );
        }
        loading.value = false;
        if (res.data.projectList.length == 0) {
          ElMessage.warning("暂无项目");
        }
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("获取回收站列表失败");
    });
}

onMounted(() => {
  getRecycleList();
});
</script>

<style scoped>
.main0 {
  margin-left: -3%;
  margin-top: -1%;
}

.wrap {
  background-color: #f8fefc;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  backdrop-filter: blur(20px);
  transition: 0.3s;
}

.btn {
  padding: 12px 50px;
  color: #063273;
  border: 2px solid #cfe1f7;
  background: #cfe1f7;
  text-align: center;
  height: 35px;
  border-radius: 20px;
  margin-left: 50px;
  transition: 0.3s linear;
  width: 10%;
  font-weight: 550;
}

.btn:hover {
  background: #063273;
  color: #f2f2f2;
}

.card {
  margin-top: 4vh;
  height: "5vh";
}

.cardimg {
  width: 100%;
  height: 200px;
}

.cardimg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.btn2 {
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

.btn2:hover {
  background: #063273;
  color: #f2f2f2;
}
</style>
