<template>
  <template v-if="loading && !props.fromDoc">
    <Loading />
  </template>
  <div v-else class="main">
    <template v-if="!props.fromDoc">
      <el-dialog v-model="dialogFormVisible3" title="创建文件">
        <el-form>
          <el-form-item label="文件名" :label-width="formLabelWidth">
            <el-input v-model="createdFileName" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible3 = false">取消</el-button>
            <el-button
              type="primary"
              @click="(dialogFormVisible3 = false), appendFile()"
              >创建</el-button
            >
          </span>
        </template>
      </el-dialog>
      <el-dialog v-model="dialogFormVisible2" title="创建文件夹">
        <el-form>
          <el-form-item label="新文件夹名" :label-width="formLabelWidth">
            <el-input v-model="newName" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取消</el-button>
            <el-button
              type="primary"
              @click="(dialogFormVisible2 = false), rename()"
              >修改</el-button
            >
          </span>
        </template>
      </el-dialog>
      <el-dialog v-model="dialogFormVisible" title="创建文件夹">
        <el-form>
          <el-form-item label="新文件夹名" :label-width="formLabelWidth">
            <el-input v-model="createdName" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button
              type="primary"
              @click="(dialogFormVisible = false), appendDir()"
              >创建</el-button
            >
          </span>
        </template>
      </el-dialog>
      <el-row style="margin-bottom: 3%; margin-top: 3%">
        <el-col :span="3">
          <el-image
            style="width: 100px; height: 100px; border-radius: 50%"
            :src="logo"
          />
        </el-col>
        <el-col :span="9" style="margin-top: 0%; font-size: 22px">
          <h1>{{ teamName }}的文档中心</h1>
        </el-col>
        <el-col :span="6" style="margin-top: 2.5%">
          <el-button @click="toRecycle()" class="btn">回收站</el-button>
        </el-col>
      </el-row>
      <el-row>
        <div class="fileList">
          <el-tree
            :data="docList"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            style="
              background-color: #cfe1f7;
              width: 1100px;
              padding: 10px;
              padding-bottom: 20px;
            "
          >
            <template #default="{ node, data }">
              <div class="custom-tree-node">
                <span @click="toDocInfo(data)">{{ node.label }}</span>
                <template v-if="!props.fromDoc">
                  <span>
                    <a
                      v-if="data.type != 1"
                      @click="(dialogFormVisible = true), changeNowItem(data)"
                    >
                      创建文件夹
                    </a>
                    <a
                      v-if="data.bound != 1"
                      style="margin-left: 8px"
                      @click="deleteD(node, data)"
                    >
                      删除
                    </a>
                    <a
                      v-if="data.bound != 1"
                      style="margin-left: 8px"
                      @click="(dialogFormVisible2 = true), changeNowItem(data)"
                    >
                      重命名
                    </a>
                    <a
                      v-if="data.type != 1"
                      style="margin-left: 8px"
                      @click="(dialogFormVisible3 = true), changeNowItem(data)"
                    >
                      创建文件
                    </a>
                    <a
                      v-if="data.type == 1"
                      style="margin-left: 8px"
                      @click="toDocInfo(data)"
                    >
                      查看文件
                    </a>
                  </span>
                </template>
              </div>
            </template>
          </el-tree>
        </div>
      </el-row>
    </template>

    <el-row>
      <div class="fileList1" v-if="props.fromDoc" style="">
        <el-tree
          :data="docList"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          style="
            width: 300px;
            padding: 10px;
            padding-bottom: 20px;
            background-color: #e6eff3;
          "
        >
          <template #default="{ node, data }">
            <div class="custom-tree-node">
              <span @click="toDocInfo(data)">{{ node.label }}</span>
            </div>
          </template>
        </el-tree>
      </div>
    </el-row>
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

/* Common Function */
const dialogFormVisible = ref(false);
const dialogFormVisible2 = ref(false);
const dialogFormVisible3 = ref(false);
const formLabelWidth = "140px";
const router = useRouter();
const route = useRoute();
const loading = ref(true);
const props = defineProps({
  fromDoc: {
    type: Boolean,
    default: false,
  },
});
let nowItem = ref();
let nowNode = ref();
function changeNowItem(data) {
  nowItem.value = data;
}

/* Initial Get Module */
let teamId = ref();
const defaultProps = {
  children: "fileList",
  label: "name",
};

let docList = ref();
let logo = ref();
let teamName = ref();

function getTeamFileList() {
  let data = new FormData();
  data.append("teamId", teamId.value);
  Document.getTeamFileList(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        docList.value = res.data.fileList;
        loading.value = false;
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("获取队伍文档列表失败！");
    });
}

function getTeamInfo() {
  teamId.value = route.params.teamID || route.query.teamID;
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

/* Operation Module */
let createdName = ref();
let newName = ref();
let createdFileName = ref();
let fileId = ref();

function appendDir() {
  if (createdName.value == "") {
    ElMessage.error("请输入内容！");
    return;
  }
  let fileData = new FormData();
  fileData.append("fatherId", nowItem.value.id);
  fileData.append("teamId", teamId.value);
  fileData.append("name", createdName.value);
  Document.createDirectory(fileData)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        ElMessage.success("创建文件夹成功！");
        getTeamFileList();
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("创建文件夹失败！");
    });
}

function deleteDir(node, data) {
  let fileData = new FormData();
  fileData.append("fileId", data.id);
  Document.deleteDirectory(fileData)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        ElMessage.success("删除文件夹成功！");
        getTeamFileList();
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("删除文件夹失败！");
    });
}

function rename() {
  if (newName.value == "") {
    ElMessage.error("请输入内容！");
    return;
  }
  let fileData = new FormData();
  fileData.append("fileId", nowItem.value.id);
  fileData.append("newName", newName.value);
  fileData.append("type", nowItem.value.type);
  console.log(nowItem.value.id);
  console.log(nowItem.value.type);
  Document.renameDirectory(fileData)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        ElMessage.success("重命名成功！");
        newName.value = "";
        getTeamFileList();
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("重命名失败！");
    });
}

function appendFile() {
  if (createdFileName.value == "") {
    ElMessage.error("请输入内容！");
    return;
  }
  let data = new FormData();
  data.append("projectId", 0);
  data.append("name", createdFileName.value);
  data.append("dirId", nowItem.value.id);
  console.log(nowItem.value.id);
  Project.addDoc(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        fileId.value = res.data.fileId;
        router.push({
          path: `/doc/editor/${fileId.value}`,
          query: {
            name: createdFileName.value,
            teamID: route.params.teamID,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("创建在线文档失败");
    });
}

function deleteDoc(node, data) {
  let fileData = new FormData();
  fileData.append("fileId", data.id);
  console.log(data.id);
  Project.deleteDoc(fileData)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        getTeamFileList();
        ElMessage.success("删除资源成功！");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("删除资源失败！");
    });
}

function deleteD(node, data) {
  if (data.type == 1) {
    deleteDoc(node, data);
  } else deleteDir(node, data);
}

function toRecycle() {
  router.push({
    path: `/team/${teamId.value}/documentRecycle`,
  });
}

function toDocInfo(data) {
  if (data.type == 0) return;
  router.push({
    path: `/doc/editor/${data.id}`,
    query: {
      teamID: route.params.teamID || route.query.teamID,
      name: data.name,
    },
  });
}

/*  */

/* Menu Module */

onMounted(() => {
  getTeamInfo();
  getTeamFileList();
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
  margin-left: 4%;
  margin-top: -1%;
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  padding-right: 8px;
  width: 100%;
  height: 100%;
}
:deep(.el-tree-node__expand-icon.is-leaf) {
  display: none;
}
</style>
<style scoped>
.fileList {
  width: 80%;
}

.fileList1 {
  width: 80%;
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

.el-tree {
}

.btn {
  padding: 12px 50px;
  color: #063273;
  border: 2px solid #cfe1f7;
  background: #cfe1f7;
  text-align: center;
  height: 40px;
  border-radius: 20px;
  margin-left: 50px;
  transition: 0.3s linear;
  width: 20%;
  font-weight: 550;
  font-size: 17px;
}

.btn:hover {
  background: #063273;
  color: #f2f2f2;
}
</style>

<style>
.el-tree-node {
  position: relative;
  padding-left: 16px;
  margin-top: 12px;
}

.el-tree-node__content .custom-tree-node {
  font-weight: bold;
  font-size: 20px;
}
.el-tree-node__children {
  position: relative;
  padding-left: 16px;
  font-size: 30px;
  color: #29282f;
}
.el-tree-node__children .custom-tree-node {
  font-weight: 450;
  font-size: 18px;
}

.el-tree-node :last-child:before {
  height: 38px;
}
.el-tree > .el-tree-node:before {
  border-left: none;
}
.el-tree > .el-tree-node:after {
  border-top: none;
}
.el-tree-node:before,
.el-tree-node:after {
  content: "";
  left: -4px;
  position: absolute;
  right: auto;
  border-width: 1px;
}
.tree :first-child .el-tree-node:before {
  border-left: none;
}
.el-tree-node:before {
  border-left: 3px dashed #4386c6;
  bottom: 0px;
  height: 100%;
  top: -20px;
  width: 1px;
}
.el-tree-node:after {
  border-top: 3px dashed #4386c6;
  height: 20px;
  top: 17px;
  width: 20px;
}

.fileList1 .el-tree-node {
  position: relative;
  padding-left: 16px;
  margin-top: 12px;
}

.fileList1 .el-tree-node__content .custom-tree-node {
  font-weight: bold;
  font-size: 20px;
}
.fileList1 .el-tree-node__children {
  position: relative;
  padding-left: 16px;
  font-size: 18px;
  color: #29282f;
}
.fileList1 .el-tree-node__children .custom-tree-node {
  font-weight: 450;
  font-size: 15px;
}

.fileList1 .el-tree-node :last-child:before {
  height: 38px;
}
.fileList1 .el-tree > .el-tree-node:before {
  border-left: none;
}
.fileList1 .el-tree > .el-tree-node:after {
  border-top: none;
}
.fileList1 .el-tree-node:before,
.fileList1 .el-tree-node:after {
  content: "";
  left: -4px;
  position: absolute;
  right: auto;
  border-width: 1px;
}
.fileList1 .tree :first-child .el-tree-node:before {
  border-left: none;
}
.fileList1 .el-tree-node:before {
  border-left: 3px dashed #4386c6;
  bottom: 0px;
  height: 100%;
  top: -20px;
  width: 1px;
}
.fileList1 .el-tree-node:after {
  border-top: 3px dashed #4386c6;
  height: 20px;
  top: 12px;
  width: 30px;
}
</style>
