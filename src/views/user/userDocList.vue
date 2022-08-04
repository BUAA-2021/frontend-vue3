<template>
  <el-container class="wrap">
    <SideBar />
    <el-main class="main0">
      <div class="main">
        <h1>{{ nickname }} 的文档列表</h1>
        <el-table
          :data="docList"
          :default-sort="{ prop: 'date', order: 'descending' }"
          style="width: 60%"
        >
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
              <el-button size="small" @click="toDocInfo(scope.row.id)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="deleteDoc(scope.row.id)"
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

const userId = useStorage("userId");
const router = useRouter();

let nickname = ref();
let docList = ref();

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

function toDocInfo(id) {
  router.push({
    path: "/editor",
    query: {
      id: id,
    },
  });
}

function deleteDoc(id) {
  let data = new FormData();
  data.append("fileId", id);
  console.log(id);
  Project.deleteDoc(data)
    .then((res) => {
      console.log(res);
      if (res.data.status == 200) {
        getDocList();
        ElMessage.success("删除资源成功！");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("删除资源失败！");
    });
}

function getDocList() {
  User.getDocList()
    .then((res) => {
      if (res.status == 200) {
        console.log(res);
        console.log(111);
        console.log(res.data);
        docList.value = res.data.docList;
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("获取用户文档列表失败！");
    });
}

onMounted(() => {
  getUserInfo();
  getDocList();
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
