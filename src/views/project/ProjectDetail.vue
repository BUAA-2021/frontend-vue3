<template>
  <el-container class="wrap">
    <SideBar />
    <template v-if="loading">
      <Loading />
    </template>
    <el-main v-else class="main0">
      <el-dialog v-model="dialogFormVisible" title="创建文件">
        <el-form :model="file">
          <el-form-item label="文件名称" :label-width="formLabelWidth">
            <el-input v-model="file.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="文件类型" :label-width="formLabelWidth">
            <el-select v-model="file.type" placeholder="选择项目类型">
              <el-option label="设计原型" value="0" />
              <el-option label="UML图" value="1" />
              <el-option label="在线文档" value="2" />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button
              type="primary"
              @click="(dialogFormVisible = false), addFile()"
              >创建</el-button
            >
          </span>
        </template>
      </el-dialog>
      <el-dialog v-model="renameProjectFormVisible" title="重命名项目">
        <el-form :model="renameProjectForm">
          <el-form-item label="填写项目新名字" :label-width="formLabelWidth">
            <el-input v-model="renameProjectForm.newName" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="renameProjectFormVisible = false"
              >取消</el-button
            >
            <el-button
              type="primary"
              @click="(renameProjectFormVisible = false), renameProject()"
              >确认</el-button
            >
          </span>
        </template>
      </el-dialog>
      <el-dialog v-model="introFormVisible">
        <el-form :model="introForm">
          <el-form-item label="项目简介" :label-width="formLabelWidth">
            <el-input
              v-model="introForm.intro"
              autocomplete="off"
              type="textarea"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="introFormVisible = false">取消</el-button>
            <el-button
              type="primary"
              @click="(introFormVisible = false), changeProjectIntro()"
              >确认</el-button
            >
          </span>
        </template>
      </el-dialog>
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
              <p>创建时间：{{ createdTime }}</p>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <p>项目简介：{{ introduction }}</p>
        </el-row>
        <el-button @click="renameProjectFormVisible = true"
          >重命名项目</el-button
        >
        <el-button @click="introFormVisible = true">修改项目简介</el-button>
        <el-button plain type="primary" @click="dialogFormVisible = true"
          >创建文件
        </el-button>
        <div style="margin-top: 20px"></div>
        <el-tabs type="border-card">
          <el-tab-pane label="原型详情"
            ><h3>该项目原型列表</h3>
            <el-table :data="protoList" stripe style="width: 100%" height="200">
              <el-table-column prop="name" label="原型名" width="180" />
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button size="small" @click="toProtoInfo(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteProto(scope.row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="UML详情">
            <h3>该项目uml图列表</h3>
            <el-table :data="umlList" stripe style="width: 100%" height="200">
              <el-table-column prop="name" label="图名" width="180" />
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button size="small" @click="downLoad(scope.row)"
                    >查看</el-button
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
          </el-tab-pane>
          <el-tab-pane label="文档详情">
            <h3>该项目文档列表</h3>
            <el-table :data="docList" stripe style="width: 100%" height="200">
              <el-table-column prop="name" label="文档名" width="180" />
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button size="small" @click="toDocInfo(scope.row)"
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
          </el-tab-pane>
        </el-tabs>
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
import { reactive, ref } from "vue";
import Loading from "../../components/common/Loading.vue";
import { timeStamp2String } from "../../utils/timeStamp2String.js";
const dialogTableVisible = ref(false);
const dialogFormVisible = ref(false);
const renameProjectFormVisible = ref(false);
const introFormVisible = ref(false);
const formLabelWidth = "140px";
const loading = ref(true);
const file = reactive({
  name: "",
  type: "",
});

const introForm = reactive({ intro: "" });
const renameProjectForm = reactive({ newName: "" });

const router = useRouter();
const stateStore = useStateStore();
let userType = ref(0);

let fileId = ref();

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
let introduction = ref("暂无简介");
let createdTime = ref("2022-08-03 17:42:00");
const identifier = ["队长", "管理员", "普通用户"];
const baseUrl = "http://101.42.173.97:8000";

function downLoad(row) {
  const a = document.createElement("a");
  a.href = row.url;
  a.download = row.fileName;
  a.click();
  // window.open(row.url);
}

function deleteUML(id) {
  let data = new FormData();
  data.append("fileId", id);
  console.log(id);
  Project.deleteUML(data)
    .then((res) => {
      console.log(res);
      if (res.data.status == 200) {
        getBasicInfo();
        ElMessage.success("删除资源成功！");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("删除资源失败！");
    });
}

function deleteProto(id) {
  let data = new FormData();
  data.append("fileId", id);
  console.log(id);
  Project.deleteProto(data)
    .then((res) => {
      console.log(res);
      if (res.data.status == 200) {
        getBasicInfo();
        ElMessage.success("删除资源成功！");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("删除资源失败！");
    });
}

function toUMLInfo() {
  router.push({
    path: "/uml",
    query: {
      id: projectId.value,
      name: file.name,
    },
  });
}

function toDocInfo(row) {
  router.push({
    path: `/editor/${row.id}`,
    query: {
      name: row.name,
    },
  });
}

function toProtoInfo(row) {
  console.log(row);
  router.push({
    path: `/prototype/${row.id}`,
    query: {
      name: row.name,
    },
  });
}

function addUML() {
  let data = new FormData();
  data.append("projectId", projectId.value);
  data.append("name", file.name);
  Project.addUML(data)
    .then((res)=>{
    console.log("addUML",res);
    if(res.data.status == 200){
      router.push({
    path: "/uml",
    query: {
      id: res.data.fileId,
      name: file.name,
    },
    });
    }})
    .catch((error)=>{
      console.log(error);
      ElMessage.error("创建UML失败");
    })
  }
function addProto() {
  let data = new FormData();
  data.append("projectId", projectId.value);
  data.append("name", file.name);
  Project.addProto(data)
    .then((res) => {
      console.log(res);
      if (res.data.status == 200) {
        fileId.value = res.data.fileId;
        router.push({
          path: `/prototype/${fileId.value}`,
          query: {
            name: file.name,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("创建原型失败");
    });
}

function addDoc() {
  let data = new FormData();
  data.append("projectId", projectId.value);
  data.append("name", file.name);
  data.append("fileId", 0);
  Project.addDoc(data)
    .then((res) => {
      console.log(res);
      if (res.data.status == 200) {
        fileId.value = res.data.fileId;
        router.push({
          path: `/editor/${fileId.value}`,
          query: {
            name: file.name,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("创建在线文档失败");
    });
}
function addFile() {
  if (file.type == "0") {
    addProto();
  } else if (file.type == "1") {
    addUML();
  } else if (file.type == "2") {
    addDoc();
  }
}

function deleteDoc(id) {
  let data = new FormData();
  data.append("fileId", id);
  console.log(id);
  Project.deleteDoc(data)
    .then((res) => {
      console.log(res);
      if (res.data.status == 200) {
        getBasicInfo();
        ElMessage.success("删除资源成功！");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("删除资源失败！");
    });
}

function changeProjectIntro() {
  let data = new FormData();
  data.append("projectId", projectId.value);
  data.append("introduction", introForm.intro);
  Project.changeProjectIntro(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        introduction.value = introForm.intro;
        ElMessage.success("修改项目简介成功！");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("修改项目简介失败！");
    });
}

function renameProject() {
  let data = new FormData();
  data.append("newName", renameProjectForm.newName);
  data.append("projectId", projectId.value);
  Project.renameProject(data)
    .then((res) => {
      console.log(res.data);
      if (res.data.status == 200) {
        name.value = renameProjectForm.newName;
        ElMessage.success("重命名项目成功");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("重命名项目失败");
    });
}

function getBasicInfo() {
  projectId.value = parseInt(router.currentRoute.value.query.id);
  /* Proto, UML, word has not finished yet. This ProjectId is for test.*/
  // projectId.value = 3;
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
        introduction.value = res.data.introduction;
        founder.value = res.data.founder;
        introForm.intro = res.data.introduction;
        renameProjectForm.newName = res.data.name;
        createdTime.value = timeStamp2String(
          new Date(res.data.createdTime).getTime()
        );
        loading.value = false;
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
