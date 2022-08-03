<template>
  <div class="main">
    <el-dialog v-model="dialogFormVisible3" title="创建项目">
      <el-form :model="form2">
        <el-form-item label="填写项目的名字" :label-width="formLabelWidth">
          <el-input v-model="form2.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible3 = false">取消</el-button>
          <el-button
            type="primary"
            @click="(dialogFormVisible3 = false), createProject()"
            >确认</el-button
          >
        </span>
      </template> </el-dialog
    ><el-dialog v-model="dialogFormVisible" title="重命名项目">
      <el-form :model="form">
        <el-form-item label="填写项目的新名字" :label-width="formLabelWidth">
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

    <el-dialog v-model="dialogFormVisible" title="重命名项目">
      <el-form :model="form">
        <el-form-item label="填写项目的新名字" :label-width="formLabelWidth">
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
    <el-row>
      <el-col :span="4">
        <el-button type="primary" plain @click="dialogFormVisible3 = true"
          >新建项目</el-button
        >
      </el-col>
      <el-col :span="4">
        <el-button type="primary" plain @click="toRecycle()"
          >管理回收站项目</el-button
        >
      </el-col>
    </el-row>
    <el-row>
      <el-col
        v-for="(item, index) in projectList"
        :key="item"
        :span="6"
        :offset="index > 0 ? 1 : 0"
      >
        <el-card
          style="border: 0px"
          shadow="always"
          :body-style="{ padding: '0px' }"
        >
          <el-image :src="item.project_logo" fit="fill" />
          <div style="padding: 14px">
            <span>{{ item.project_name }}</span>
            <p>简介: {{ item.project_production }}</p>
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
                  (dialogFormVisible = true), changeNowProject(index, item.id)
                "
                >重命名项目</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Project } from "../../api/project.js";
import { useStateStore } from "../../stores/state.js";
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

const dialogFormVisible = ref(false);
const dialogVisible2 = ref(false);
const dialogFormVisible3 = ref(false);

const formLabelWidth = "140px";

const router = useRouter();
let projectId = ref();
let projectIndex = ref();
let form = ref({
  newName: "",
});
let form2 = ref({
  name: "",
});
let teamId = ref();
let projectList = ref([
  {
    name: "test项目",
    description: "This is a test project!",
    founder: "Ando",
  },
  {
    name: "test项目",
    description: "This is a test project!",
    founder: "Ando",
  },
]);

function toRecycle() {
  router.push({
    path: "/project/recycle",
    query: {
      teamId: teamId.value,
    },
  });
}

function createProject() {
  router.push({
    path: "/proto",
    query: {
      teamId: teamId.value,
      projectName: form2.value.name,
    },
  });
}

function changeNowProject(index, id) {
  projectIndex.value = index;
  projectId.value = id;
}

function deleteProject() {
  let data = new FormData();
  data.append("projectId", projectId.value);
  Project.deleteProject(data)
    .then((res) => {
      console.log(res);
      if (res.data.status == 200) {
        location.reload();
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
        location.reload();
        ElMessage.success("重命名项目成功");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("重命名项目失败");
    });
}

function getProjectList() {
  teamId.value = router.currentRoute.value.query.id;
  let data = new FormData();
  data.append("teamId", teamId.value);
  Project.getProjectList(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        projectList.value = res.data.data;
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("获取项目列表失败");
    });
}

onMounted(() => {
  getProjectList();
});
</script>

<style scoped>
.main {
  margin-left: 15%;
  margin-top: 5%;
}
.card-brief {
  color: #999;
  margin-bottom: 3%;
}
</style>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.box-card {
  width: 300px;
}
</style>
<style>
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
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
