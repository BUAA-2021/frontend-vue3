<template>
  <template v-if="loading">
    <Loading />
  </template>
  <div v-else class="main">
    <el-button
      type="primary"
      plain
      @click="toLast()"
      style="margin-bottom: 3%; margin-left: 0"
      class="btn"
      >返回上一级</el-button
    >
    <el-table :data="docList" style="width: 100%">
      <el-table-column fixed prop="name" label="文档名" width="180" />
      <el-table-column prop="deletedTime" label="删除时间" width="200" />
      <el-table-column prop="type" label="文件类型" width="160">
        <template #default="scope">
          {{ fileType[scope.row.type] }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="restoreDoc(scope.row)"
            >恢复</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="finalDelete(scope.row)"
            >彻底删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { Document } from "../../api/document.js";
import { Team } from "../../api/team.js";
import { Project } from "../../api/project.js";
import { onMounted } from "vue";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { timeStamp2String } from "../../utils/timeStamp2String.js";

/* Init */
const route = useRoute();
const router = useRouter();
let docList = ref();
let teamId = ref();
let logo = ref();
let teamName = ref();
const loading = ref(true);
const fileType = ref(["文件夹", "文件"]);

function toLast() {
  router.push({
    path: `/team/${teamId.value}/documentCenter`,
  });
}

function getTeamInfo() {
  teamId.value = route.params.teamID;
  let data = new FormData();
  data.append("id", teamId.value);
  Team.getTeamInfo(data)
    .then((res) => {
      console.log(res);
      if (res.data.status == 200) {
        logo.value = res.data.logo;
        teamName.value = res.data.name;
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("获取队伍信息失败！");
    });
}

function finalDelete(row) {
  let data = new FormData();
  data.append("teamId", teamId.value);
  data.append("fileId", row.id);
  data.append("type", row.type);

  Document.finalDeleteDoc(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        ElMessage.success("彻底删除成功！");
        getTeamRecycleList();
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("彻底删除失败！");
    });
}

function restoreDoc(row) {
  let data = new FormData();
  data.append("fileId", row.id);
  data.append("type", row.type);
  data.append("teamId", teamId.value);

  Document.restoreDoc(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        ElMessage.success("文档恢复成功！");
        getTeamRecycleList();
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("文档恢复失败！");
    });
}

function getTeamRecycleList() {
  let data = new FormData();
  data.append("teamId", teamId.value);
  Document.getTeamRecycleList(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        docList.value = res.data.docList;
        loading.value = false;
        for (let i = 0; i < docList.value.length; i++) {
          docList.value[i].deletedTime = timeStamp2String(
            new Date(res.data.docList[i].deletedTime).getTime()
          );
        }
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("获取队伍文档列表失败！");
    });
}

onMounted(() => {
  getTeamInfo();
  getTeamRecycleList();
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
  margin-left: 10%;
  margin-top: 1%;
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

.bottom {
  margin-top: 5%;
}
</style>

<style scoped>
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
</style>
