<template>
  <el-container class="wrap">
    <SideBar />
    <template v-if="loading">
      <Loading />
    </template>
    <el-main v-else class="main0">
      <div class="main">
        <h1>{{ nickname }} 的UML图列表</h1>
        <el-table :data="umlList" style="width: 80%">
          <el-table-column
            prop="fileName"
            label="文档名"
            sortable
            width="180"
          />
          <el-table-column prop="founderName" label="创建者" width="180" />
          <el-table-column prop="projectName" label="项目名" width="180" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="toUMLInfo(scope.row)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="deleteUML(scope.row.id)"
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
import { useStorage } from "@vueuse/core";
import { ElMessage } from "element-plus";
import { Account } from "../../api/account.js";
import { User } from "../../api/user.js";
import { useRouter } from "vue-router";
import { Project } from "../../api/project.js";
import Loading from "../../components/common/Loading.vue";

const userId = useStorage("userId");
const router = useRouter();
const loading = ref(true);

let nickname = ref();
let umlList = ref();

const getUserInfo = () => {
  let payload = new FormData();
  payload.append("wantId", userId.value);
  Account.getUser(payload)
    .then((res) => {
      nickname.value = res.data.nickname;
    })
    .catch((err) => {
      console.log(err);
    });
};


function toUMLInfo(row) {
  router.push({
    path: "/uml",
    query: {
      id: row.id,
      name: row.fileName,
      content: row.content,
    },
  });
}

function deleteUML(id) {
  let data = new FormData();
  data.append("fileId", id);
  console.log(id);
  Project.deleteUML(data)
    .then((res) => {
      console.log(res);
      if (res.data.status == 200) {
        getUMLList();
        ElMessage.success("删除资源成功！");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("删除资源失败！");
    });
}

function getUMLList() {
  User.getUMLList()
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        umlList.value = res.data.UML;
        loading.value = false;
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("获取用户uml图列表失败！");
    });
}

onMounted(() => {
  getUserInfo();
  getUMLList();
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
