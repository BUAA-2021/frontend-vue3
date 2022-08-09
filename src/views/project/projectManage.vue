<template>
  <template v-if="loading">
    <Loading />
  </template>
  <el-main v-else class="main0">
    <div class="main">
      <el-dialog v-model="dialogFormVisible3" title="创建项目">
        <el-form :model="form2">
          <el-form-item label="填写项目名称" :label-width="formLabelWidth">
            <el-input v-model="form2.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="项目logo" :label-width="formLabelWidth">
            <el-upload
              class="avatar-uploader"
              action=""
              name="file"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :http-request="uploadIcon"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="简介" :label-width="formLabelWidth">
            <el-input
              v-model="introduction"
              style="width: 50%"
              :rows="4"
              type="textarea"
              placeholder="输入项目简介"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible3 = false">取消</el-button>
            <el-button type="primary" @click="createProject()">确认</el-button>
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

      <el-dialog v-model="copyDialogVisible" title="复制项目">
        <h2>确认复制该项目吗？</h2>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="copyDialogVisible = false">取消</el-button>
            <el-button
              type="primary"
              @click="(copyDialogVisible = false), copyProject()"
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

      <el-row class="btns">
        <el-col span="4">
          <el-button type="primary" plain @click="goTeamInfo" class="btn"
            >返回上一级</el-button
          >
        </el-col>
        <el-col span="4">
          <el-button
            type="primary"
            plain
            @click="dialogFormVisible3 = true"
            class="btn"
            >新建项目</el-button
          >
        </el-col>
        <el-col span="4">
          <el-button type="primary" plain @click="toRecycle()" class="btn"
            >管理回收站项目</el-button
          >
        </el-col>
      </el-row>
      <el-row style="margin-top: 1%; margin-left: 5%">
        <el-col :span="4">
          <el-input
            style="width: 100%"
            v-model="search"
            placeholder="输入项目名称"
          />
        </el-col>
        <el-col :span="4">
          <el-button
            style="margin-left: 3%"
            type="primary"
            plain
            @click="searchProject()"
            class="btn2"
            >搜索项目</el-button
          >
        </el-col>
        <el-col :span="4">
          <el-button
            style="margin-left: 3%"
            type="primary"
            plain
            @click="sortByTime()"
            class="btn2"
            >按时间排序</el-button
          >
        </el-col>
        <el-col :span="4">
          <el-button
            style="margin-left: 3%"
            type="primary"
            plain
            class="btn2"
            @click="sortByAlpha()"
            >按字母排序</el-button
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col
          v-for="(item, index) in projectList"
          :key="item"
          :span="5"
          :offset="1"
        >
          <el-card
            style="border: 0px"
            shadow="always"
            :body-style="{ padding: '0px' }"
            class="card"
          >
            <div class="cardimg">
              <img :src="item.project_logo" fit="fill" />
            </div>
            <div style="padding: 14px">
              <span>{{ item.project_name }}</span>
              <p>简介: {{ item.project_production }}</p>
              <time class="time">创建者：{{ item.founder }}</time>
              <div class="bottom">
                <el-button text @click="toProjectInfo(item.id)"
                  >进入项目</el-button
                >
                <el-button
                  text
                  @click="
                    (copyDialogVisible = true), changeNowProject(index, item.id)
                  "
                  >复制项目</el-button
                >
              </div>
              <div class="bottom">
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
  </el-main>
</template>

<script setup>
import { onMounted } from "vue";
import { Project } from "../../api/project.js";
import { useStateStore } from "../../stores/state.js";
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { ElMessageBox } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import { File } from "../../api/file.js";

const dialogFormVisible = ref(false);
const dialogVisible2 = ref(false);
const dialogFormVisible3 = ref(false);
const copyDialogVisible = ref(false);
const loading = ref(true);
const formLabelWidth = "140px";
const router = useRouter();
const route = useRoute();

/* Search Module */
let search = ref();

function searchProject() {
  let data = new FormData();
  data.append("keyword", search.value);
  data.append("teamId", teamId.value);
  Project.searchProject(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        projectList.value = res.data.projectList;
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("搜索项目列表失败！");
    });
}

/* Sort Module */
let timeSort = ref(1);
let alphaSort = ref(0);

function sortByTime() {
  let data = new FormData();
  data.append("type", timeSort.value);
  data.append("teamId", teamId.value);
  timeSort.value = 1 - timeSort.value;
  Project.sortByTime(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        projectList.value = res.data.projectList;
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("排序项目列表失败！");
    });
}

function sortByAlpha() {
  let data = new FormData();
  data.append("type", alphaSort.value);
  data.append("teamId", teamId.value);
  alphaSort.value = 1 - alphaSort.value;
  Project.sortByAlpha(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        projectList.value = res.data.projectList;
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("排序项目列表失败！");
    });
}
let introduction = ref();
let projectId = ref();
let projectIndex = ref();
let imageUrl = ref("");
let imgId = ref();
let form = ref({
  newName: "",
});
let form2 = ref({
  name: "",
});
let teamId = ref();
let projectList = ref([
  // {
  //   name: "test项目",
  //   description: "This is a test project!",
  //   founder: "Ando",
  // },
  // {
  //   name: "test项目",
  //   description: "This is a test project!",
  //   founder: "Ando",
  // },
]);

function goTeamInfo() {
  router.go(-1);
}
function toProjectInfo(id) {
  router.push({
    path: `/project/${id}/detail`,
    query: {
      id: id,
      teamID: route.params.teamID,
    },
  });
}

function toRecycle() {
  router.push({
    name: "projectRecycle",
    query: {
      teamID: route.params.teamID,
    },
  });
}

function createProject() {
  if (
    teamId.value == "" ||
    form2.value.name == "" ||
    imgId.value == undefined ||
    introduction.value == "" ||
    introduction.value == undefined
  ) {
    ElMessage.error("请填写完整信息！");
    return;
  }
  dialogFormVisible3.value = false;
  let data = new FormData();
  data.append("teamId", teamId.value);
  data.append("name", form2.value.name);
  data.append("logo", imgId.value);
  data.append("introduction", introduction.value);
  Project.createProject(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        let id = res.data.projectId;
        router.push({
          path: `/project/${id}/detail`,
          query: {
            id: id,
            teamID: route.params.teamID,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("创建项目失败");
    });
}

function copyProject() {
  let data = new FormData();
  data.append("id", projectId.value);
  Project.copyProject(data)
    .then((res) => {
      console.log(res);
      if (res.data.status == 200) {
        getProjectList();
        ElMessage.success("复制项目成功");
      }
    })
    .catch((err) => {
      console.log(err);
      ElMessage.error("复制项目失败");
    });
}

function changeNowProject(index, id) {
  projectIndex.value = index;
  projectId.value = id;
  form.value.newName = projectList.value[index].project_name;
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
  teamId.value = route.params.teamID;
  let data = new FormData();
  data.append("teamId", teamId.value);
  Project.getProjectList(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        projectList.value = res.data.data;
        loading.value = false;
        if (res.data.data.length == 0) {
          ElMessage.warning("暂无项目");
        }
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("获取项目列表失败");
    });
}

function handleAvatarSuccess(response, uploadFile) {
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
  if (response.success == true) {
    imgId = res.data.id;
    imageUrl.value = res.url;
    ElMessage.success({
      type: "success",
      message: "上传成功",
    });
  }
}
function uploadIcon(params) {
  let data = new FormData();
  data.append("file", params.file);
  data.append("type", 1);
  console.log(data);
  File.uploadFile(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        imgId.value = res.data.id;
        ElMessage.success("上传成功");
        console.log(imgId.value);
      } else {
        imageUrl.value = "";
        ElMessage.error("上传失败，请检查网络");
      }
    })
    .catch((error) => {
      console.log("上传图片失败");
      console.log(error);
      imageUrl.value = "";
      ElMessage.error("上传失败，请检查网络");
    });
}
function beforeAvatarUpload(rawFile) {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("上传的图片必须是 JPG/PNG 格式");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("上传的图片大小不能超过 2MB!");
    return false;
  }
  imageUrl.value = URL.createObjectURL(rawFile);
  console.log(imageUrl.value);
  return true;
}

onMounted(() => {
  getProjectList();
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
.main {
  margin-left: -5%;
  margin-top: 2%;
}
.btns {
  margin-left: 5%;
  margin-bottom: 3%;
  margin-top: -3%;
}

.btn {
  padding: 12px 50px;
  color: #063273;
  border: 2px solid #cfe1f7;
  background: #cfe1f7;
  text-align: center;
  height: 35px;
  border-radius: 20px;

  transition: 0.3s linear;
  width: 50%;
  font-weight: 550;
}

.btn:hover {
  background: #063273;
  color: #f2f2f2;
}

.btn2:hover {
  background: #063273;
  color: #f2f2f2;
}

.btn2 {
  padding: 12px 50px;
  color: #063273;
  border: 2px solid #cfe1f7;
  background: #cfe1f7;
  text-align: center;
  height: 35px;
  border-radius: 5px;
  transition: 0.3s linear;
  width: 50%;
  font-weight: 550;
}

.btn2:hover {
  background: #063273;
  color: #f2f2f2;
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

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style></style>
