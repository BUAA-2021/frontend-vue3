<template>
  <el-container class="wrap">
    <SideBar />
    <el-main class="main0">
      <div class="main">
        <el-row>
          <el-col :span="3">
            <div class="demo-image">
              <el-image
                style="width: 100px; height: 100px; border-radius: 50%"
                :src="url"
                :fit="fit"
              />
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <h1>{{ name }}</h1>
              <p>创建者：{{ founder }}</p>
              <p>创建时间{{ createdTime }}</p>
            </div>
          </el-col>
        </el-row>
        <p>该项目原型列表</p>
        <el-table :data="protoList" stripe style="width: 100%" height="200">
          <el-table-column prop="name" label="原型名" width="180" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="toResourceInfo(scope.row.id, 0)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="deleteResource(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-bottom: 20px"></div>
        <p>该项目uml图列表</p>
        <el-table :data="umlList" stripe style="width: 100%" height="200">
          <el-table-column prop="name" label="图名" width="180" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="toResourceInfo(scope.row.id, 1)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="deleteResource(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-bottom: 20px"></div>
        <p>该项目文档列表</p>
        <el-table :data="docList" stripe style="width: 100%" height="200">
          <el-table-column prop="name" label="文档名" width="180" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="toResourceInfo(scope.row.id, 2)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="deleteResource(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { onMounted } from "vue";
import { Project } from "../../api/project.js";
import { useRouter } from "vue-router";
import { User } from "../../api/user.js";
import { useStateStore } from "../../stores/state.js";

const router = useRouter();
const stateStore = useStateStore();
let userType = ref(0);

let fit = "fill";
let url = ref(
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
);
let name = ref("猫猫派对");
let protoList = ref([]);
let umlList = ref([]);
let docList = ref([]);
let projectId = ref(3);
let founder = ref("ando");
let createdTime = ref("2022-08-03 17:42:00");
const identifier = ["队长", "管理员", "普通用户"];
const baseUrl = "http://101.42.173.97:8000";

function toResourceInfo(id, type) {}

function deleteResource(id) {
  let data = new FormData();
  data.append("projectId", projectId.value);
  data.append("id", id);
  Project.deleteResource(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        getBasicInfo();
        ElMessage.success("删除资源成功！");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("删除资源失败！");
    });
}

function toProjectList() {
  router.push({
    path: "/project/manage",
    query: {
      id: teamId.value,
    },
  });
}

function getBasicInfo() {
  // projectId.value = parseInt(router.currentRoute.value.query.id);
  /* Proto, UML, word has not finished yet. This ProjectId is for test.*/
  projectId.value = 3;
  let data = new FormData();
  data.append("projectId", projectId.value);
  Project.getProjectInfo(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        protoList.value = res.data.protoList;
        umlList.value = res.data.umlList;
        docList.value = res.data.docList;
        name.value = res.data.name;
        url.value = res.data.logo;
        founder.value = res.data.founder;
        createdTime.value = res.data.createdTime;
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("获取项目信息失败");
    });
}

onMounted(() => {
  getBasicInfo();
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
</style>
