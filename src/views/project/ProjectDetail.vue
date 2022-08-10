<template>
  <template v-if="loading">
    <Loading />
  </template>
  <el-main v-else>
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
        <el-form-item
          v-if="file.type == '0'"
          label="原型设计模版"
          :label-width="formLabelWidth"
        >
          <el-select v-model="protoTemplate" placeholder="选择模版">
            <el-option label="无模版" value="0" />
            <el-option label="手机线上商城APP" value="1" />
            <el-option label="线上商城网页端" value="2" />
            <el-option label="学术成果分享平台" value="3" />
          </el-select>
        </el-form-item>
        <el-form
          ref="protoSizeFormRef"
          :model="newProtoSize"
          :rules="protoRule"
        >
          <el-form-item
            v-if="protoTemplate == '0'"
            label="页面宽度"
            :label-width="formLabelWidth"
            prop="width"
          >
            <el-input v-model.number="newProtoSize.width" autocomplete="off" />
          </el-form-item>
          <el-form-item
            v-if="protoTemplate == '0'"
            label="页面高度"
            :label-width="formLabelWidth"
            prop="height"
          >
            <el-input v-model.number="newProtoSize.height" autocomplete="off" />
          </el-form-item>
        </el-form>
        <el-form-item
          v-if="file.type == '2'"
          label="在线文档模版"
          :label-width="formLabelWidth"
        >
          <el-select v-model="document" placeholder="无模版">
            <el-option label="无模版" value="0" />
            <el-option label="会议记录" value="1" />
            <el-option label="研发每日站会" value="2" />
            <el-option label="软件需求规格说明书" value="3" />
            <el-option label="架构设计说明书" value="4" />
            <el-option label="项目规划" value="5" />
            <el-option label="工作总结" value="6" />
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
          <el-button @click="renameProjectFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="(renameProjectFormVisible = false), renameProject()"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="renameProtoFormVisible" title="重命名原型设计">
      <el-form :model="renameProtoForm">
        <el-form-item label="填写原型设计新名字" :label-width="formLabelWidth">
          <el-input v-model="renameProtoForm.newName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="renameProtoFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="(renameProtoFormVisible = false), renameProto(nowRow)"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="renameUMLFormVisible" title="重命名UML图">
      <el-form :model="renameUMLForm">
        <el-form-item label="填写UML图新名字" :label-width="formLabelWidth">
          <el-input v-model="renameUMLForm.newName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="renameUMLFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="(renameUMLFormVisible = false), renameUML(nowRow)"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="renameDocFormVisible" title="重命名UML图">
      <el-form :model="renameDocForm">
        <el-form-item label="填写UML图新名字" :label-width="formLabelWidth">
          <el-input v-model="renameDocForm.newName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="renameDocFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="(renameDocFormVisible = false), renameDoc(nowRow)"
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
      <el-button @click="renameProjectFormVisible = true" class="btn"
        >重命名项目</el-button
      >
      <el-button @click="introFormVisible = true" class="btn"
        >修改项目简介</el-button
      >
      <el-button plain @click="dialogFormVisible = true" class="btn"
        >创建文件
      </el-button>
      <el-button plain @click="toCurrentTeam" class="btn"
        >返回当前团队
      </el-button>
      <div style="margin-top: 20px"></div>
      <el-tabs type="border-card">
        <el-tab-pane label="原型详情"
          ><div style="margin-left: 3%">
            <h3>该项目原型列表</h3>
            <el-table :data="protoList" stripe style="width: 100%" height="200">
              <el-table-column prop="name" label="原型名" width="180" />
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button
                    size="small"
                    @click="toProtoInfo(scope.row)"
                    class="btn2"
                    >编辑</el-button
                  >
                  <el-button
                    size="small"
                    @click="
                      (renameProtoFormVisible = true), getNowProtoRow(scope.row)
                    "
                    class="btn2"
                    >重命名</el-button
                  >
                  <el-button
                    size="small"
                    @click="deleteProto(scope.row.id)"
                    class="btn1"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane label="UML详情">
          <div style="margin-left: 3%">
            <h3>该项目uml图列表</h3>
            <el-table :data="umlList" stripe style="width: 100%" height="200">
              <el-table-column prop="name" label="图名" width="180" />
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button
                    size="small"
                    @click="toUMLInfo(scope.row)"
                    class="btn2"
                    >编辑</el-button
                  >
                  <el-button
                    size="small"
                    @click="
                      (renameUMLFormVisible = true), getNowUMLRow(scope.row)
                    "
                    class="btn2"
                    >重命名</el-button
                  >
                  <el-button
                    v-if="
                      scope.row.can_unlock == 1 && scope.row.is_locking == 1
                    "
                    size="small"
                    @click="toUMLInfo(scope.row)"
                    class="btn2"
                    >解锁</el-button
                  >
                  <el-button
                    size="small"
                    @click="deleteUML(scope.row.id)"
                    class="btn1"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="文档详情">
          <div style="margin-left: 3%">
            <h3>该项目文档列表</h3>
            <el-table :data="docList" stripe style="width: 100%" height="200">
              <el-table-column prop="name" label="文档名" width="180" />
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button
                    size="small"
                    @click="toDocInfo(scope.row)"
                    class="btn2"
                    >编辑</el-button
                  >
                  <el-button
                    size="small"
                    @click="
                      (renameDocFormVisible = true), getNowDocRow(scope.row)
                    "
                    class="btn2"
                    >重命名</el-button
                  >
                  <el-button
                    size="small"
                    class="btn1"
                    @click="deleteDoc(scope.row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-main>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { onMounted } from "vue";
import { Project } from "../../api/project.js";
import { useRouter, useRoute } from "vue-router";
import { User } from "../../api/user.js";
import { useStateStore } from "../../stores/state.js";
import Loading from "../../components/common/Loading.vue";
import { timeStamp2String } from "../../utils/timeStamp2String.js";
const dialogTableVisible = ref(false);
const dialogFormVisible = ref(false);
const templateFormVisible = ref(false);
const renameProjectFormVisible = ref(false);
const introFormVisible = ref(false);
const renameProtoFormVisible = ref(false);
const renameUMLFormVisible = ref(false);
const renameDocFormVisible = ref(false);
const formLabelWidth = "140px";
const loading = ref(true);
const document = ref();
const file = reactive({
  name: "",
  type: "",
});
const newProtoSize = reactive({
  width: 1200,
  height: 740,
});
const protoTemplate = ref("");

const introForm = reactive({ intro: "" });
const renameProjectForm = reactive({ newName: "" });
const renameProtoForm = reactive({ newName: "" });
const renameUMLForm = reactive({ newName: "" });
const renameDocForm = reactive({ newName: "" });
const nowRow = ref(0);

const router = useRouter();
const route = useRoute();
const stateStore = useStateStore();
let userType = ref(0);
const protoSizeFormRef = ref();

let fileId = ref();

let fit = "fill";
let url = ref(
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
);
let name = ref("猫猫派对");
let protoList = ref([]);
let umlList = ref([]);
let docList = ref([]);
let projectId = ref();
let founder = ref("ando");
let introduction = ref("暂无简介");
let createdTime = ref("2022-08-03 17:42:00");
const identifier = ["队长", "管理员", "普通用户"];
const baseUrl = "http://101.42.173.97:8000";

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
function toCurrentTeam() {
  router.push({
    path: `/team/${route.query.teamID}/teamInfo`,
  });
}
const validateWidth = function (rule, value, callback) {
  if (value === "") {
    return callback(new Error("宽度不能为空！"));
  } else {
    callback();
  }
};

const validateHeight = function (rule, value, callback) {
  if (value === "") {
    return callback(new Error("高度不能为空！"));
  } else {
    callback();
  }
};

const protoRule = reactive({
  width: [{ validator: validateWidth, trigger: "blur" }],
  height: [{ validator: validateHeight, trigger: "blur" }],
});

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

function toUMLInfo(row) {
  const formData = new FormData();
  formData.append("fileId", row.id);
  Project.editUML(formData).then((res) => {
    console.log(res);
    if (res.data.fileStatus == 200) {
      router.push({
        path: `/doc/uml/${row.id}`,
        query: {
          id: row.id,
          teamID: route.query.teamID,
          projectID: route.query.id,
          name: row.name,
          content: res.data.content,
        },
      });
    } else if (res.data.fileStatus == 300) {
      ElMessage.error("当前文档有用户正在进行编辑，进入只读模式!");
      router.push({
        path: `/doc/uml/${row.id}`,
        query: {
          id: row.id,
          teamID: route.query.teamID,
          projectID: route.query.id,
          name: row.name + "(只读) 当前界面操作不会保存到服务器",
          readOnly: true,
          content: res.data.content,
        },
      });
    }
  });
}

function toDocInfo(row) {
  router.push({
    path: `/doc/editor/${row.id}`,
    query: {
      teamID: route.query.teamID,
      projectID: route.query.id,
      name: row.name,
      first: 0,
    },
  });
}

function toProtoInfo(row) {
  console.log("toproto", row.id);
  router.push({
    path: `/doc/prototype/${row.id}`,
    query: {
      teamID: route.query.teamID,
      projectID: route.query.id,
      name: row.name,
    },
  });
}

function getNowProtoRow(row) {
  nowRow.value = row;
  renameProtoForm.newName = row.name;
}

function getNowUMLRow(row) {
  nowRow.value = row;
  renameUMLForm.newName = row.name;
}

function getNowDocRow(row) {
  nowRow.value = row;
  renameDocForm.newName = row.name;
}

function renameProto(row) {
  if (renameProtoForm.newName == "") {
    ElMessage.error("新名称不能为空！");
    return;
  }
  let data = new FormData();
  data.append("fileId", row.id);
  data.append("newName", renameProtoForm.newName);
  Project.renameProto(data)
    .then((res) => {
      if (res.status == 200) {
        ElMessage.success("重命名原型设计成功！");
        getBasicInfo();
      } else {
        ElMessage.error("重命名原型设计失败！");
      }
    })
    .catch((err) => {
      ElMessage.error("重命名原型设计失败！");
      console.log(err);
    });
}

function renameUML(row) {
  if (renameUMLForm.newName == "") {
    ElMessage.error("新名称不能为空！");
    return;
  }
  let data = new FormData();
  data.append("fileId", row.id);
  data.append("newName", renameUMLForm.newName);
  Project.renameUML(data)
    .then((res) => {
      if (res.status == 200) {
        ElMessage.success("重命名UML图成功！");
        getBasicInfo();
      } else {
        ElMessage.error("重命名UML图失败！");
      }
    })
    .catch((err) => {
      ElMessage.error("重命名UML图失败！");
      console.log(err);
    });
}

function renameDoc(row) {
  if (renameDocForm.newName == "") {
    ElMessage.error("新名称不能为空！");
    return;
  }
  let data = new FormData();
  data.append("fileId", row.id);
  data.append("newName", renameDocForm.newName);
  Project.renameDoc(data)
    .then((res) => {
      if (res.status == 200) {
        ElMessage.success("重命名文档成功！");
        getBasicInfo();
      } else {
        ElMessage.error("重命名文档失败！");
      }
    })
    .catch((err) => {
      ElMessage.error("重命名文档失败！");
      console.log(err);
    });
}

function addUML() {
  let data = new FormData();
  data.append("projectId", projectId.value);
  data.append("name", file.name);
  Project.addUML(data)
    .then((res) => {
      console.log("addUML", res);
      if (res.data.status == 200) {
        const formData = new FormData();
        formData.append("fileId", res.data.fileId);
        Project.editUML(formData).then((response) => {
          console.log("response", response);
          if (response.data.fileStatus == 200) {
            router.push({
              path: `/doc/uml/${res.data.fileId}`,
              query: {
                teamID: route.query.teamID,
                projectID: route.query.id,
                id: res.data.fileId,
                name: file.name,
                content: response.data.content,
              },
            });
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("创建UML失败");
    });
}
function addProto() {
  let data = new FormData();
  data.append("projectId", projectId.value);
  data.append("name", file.name);
  data.append("type", protoTemplate.value);
  data.append("width", newProtoSize.width);
  data.append("height", newProtoSize.height);
  Project.addProto(data)
    .then((res) => {
      console.log(res);
      if (res.data.status == 200) {
        fileId.value = res.data.fileId;
        router.push({
          path: `/doc/prototype/${fileId.value}`,
          query: {
            teamID: route.query.teamID,
            projectID: route.query.id,
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
  data.append("dirId", 0);
  Project.addDoc(data)
    .then((res) => {
      console.log(res);
      if (res.data.status == 200) {
        fileId.value = res.data.fileId;
        router.push({
          path: `/doc/editor/${fileId.value}`,
          query: {
            first: document.value,
            teamID: route.query.teamID,
            projectID: route.query.id,
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
  if (file.name == "" || file.name == undefined) {
    ElMessage.error("请填写文件名！");
    return;
  }
  if (file.type == "0") {
    addProto();
  } else if (file.type == "1") {
    addUML();
  } else if (file.type == "2") {
    addDoc();
  } else {
    ElMessage.error("请选择文件类型！");
  }
}

function deleteDoc(id) {
  let data = new FormData();
  data.append("fileId", id);
  console.log(id);
  Project.deleteDoc(data)
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
  if (renameProjectForm.newName == "") {
    ElMessage.error("新名称不能为空！");
    return;
  }
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
  projectId.value = parseInt(route.query.id);
  /* Proto, UML, word has not finished yet. This ProjectId is for test.*/
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
  height: 92%;
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
  margin-left: 5%;
  margin-top: 1%;
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

.btn {
  padding: 12px 50px;
  color: #063273;
  border: 2px solid #cfe1f7;
  background: #cfe1f7;
  text-align: center;
  height: 35px;
  border-radius: 6px;

  transition: 0.3s linear;
  width: 15%;
  font-weight: 550;
}

.btn:hover {
  background: #063273;
  color: #f2f2f2;
}
.btn1 {
  padding: 12px 50px;
  color: #f25b67;
  border: 2px solid #f25b67;
  background: #f6d2c9;
  text-align: center;
  height: 35px;
  border-radius: 6px;
  font-size: 13px;
  transition: 0.3s linear;
  width: 8%;
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
  font-size: 13px;
  transition: 0.3s linear;
  width: 8%;
  font-weight: 550;
}

.btn2:hover {
  background: #063273;
  color: #f2f2f2;
}
</style>
