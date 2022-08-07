<template>
  <el-container class="wrap">
    <SideBar />
    <el-main class="main0">
      <template v-if="loading">
        <Loading />
      </template>
      <div v-else class="main">
        <el-dialog v-model="dialogFormVisible" title="重命名项目">
          <el-form :model="form">
            <el-form-item label="填写项目新名字" :label-width="formLabelWidth">
              <el-input v-model="form.newName" autocomplete="off" />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button
                type="primary"
                @click="(dialogFormVisible = false), renameProject()"
                >确认</el-button
              >
            </span>
          </template>
        </el-dialog>

        <el-dialog v-model="dialogVisible2" title="删除项目" width="30%">
          <span>确认删除该项目吗</span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible2 = false">取消</el-button>
              <el-button
                type="primary"
                @click="(dialogVisible2 = false), deleteProject()"
                >确认</el-button
              >
            </span>
          </template>
        </el-dialog>
        <el-row>
          <el-col
            v-for="(item, index) in projectList"
            :key="item"
            :span="6.5"
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
                <p>简介: {{ item.introduction }}</p>
                <time class="time">创建者：{{ item.founder }}</time>
                <div class="bottom">
                  <el-button text class="button" @click="toProjectInfo(item.id)"
                    >进入项目</el-button
                  >
                  <el-button
                    text
                    @click="
                      (dialogVisible2 = true), changeNowProject(index, item.id)
                    "
                    >删除项目</el-button
                  >
                  <el-button
                    text
                    @click="
                      (dialogFormVisible = true),
                        changeNowProject(index, item.id)
                    "
                    >重命名项目</el-button
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
import { Project } from "../../api/project.js";
import { useRouter } from "vue-router";
import Loading from "../../components/common/Loading.vue";

const dialogFormVisible = ref(false);
const dialogVisible2 = ref(false);
const formLabelWidth = "140px";
const router = useRouter();
const loading = ref(true);
let projectId = ref();
let projectIndex = ref();
let form = ref({
  newName: "",
});
let form2 = ref({
  name: "",
});
let projectList = ref([]);

function toProjectInfo(id) {
  router.push({
    path: "/project/detail",
    query: {
      id: id,
    },
  });
}

function changeNowProject(index, id) {
  projectIndex.value = index;
  projectId.value = id;
  form.value.newName = projectList.value[index].name;
}

function deleteProject() {
  let data = new FormData();
  data.append("projectId", projectId.value);
  Project.deleteProject(data)
    .then((res) => {
      console.log(res);
      if (res.data.status == 200) {
        getUserProjectList();
        ElMessage.success("删除项目成功");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("删除项目失败");
    });
}

function renameProject() {
  let data = new FormData();
  data.append("newName", form.value.newName);
  data.append("projectId", projectId.value);
  Project.renameProject(data)
    .then((res) => {
      console.log(res.data);
      if (res.data.status == 200) {
        projectList.value[projectIndex.value].newName = form.value.newName;
        getUserProjectList();
        ElMessage.success("重命名项目成功");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("重命名项目失败");
    });
}

function getUserProjectList() {
  Project.getUserProjectList()
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        projectList.value = res.data.projectList;
        loading.value = false;
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("获取项目列表失败");
    });
}

onMounted(() => {
  getUserProjectList();
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
