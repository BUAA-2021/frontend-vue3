<template>
  <el-container class="wrap">
    <SideBar />
    <el-main>
      <el-dialog v-model="dialogFormVisible" title="上传文件">
        <el-form :model="form">
          <el-form-item label="上传文件" :label-width="formLabelWidth">
            <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              action=""
              name="file"
              multiple
              :show-file-list="true"
              :limit="1"
              :on-exceed="handleExceed"
              :http-request="uploadFile"
            >
              <el-button type="primary">点击上传</el-button>
              <template #tip>
                <!-- <div class="el-upload__tip">文件一次只能上传一个</div> -->
              </template>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button
              type="primary"
              @click="(dialogFormVisible = false), addUML()"
              >完成</el-button
            >
          </span>
        </template>
      </el-dialog>
      <el-row>
        <el-button
          style="margin-top: -0.5%; margin-right: 1%"
          size="large"
          type="primary"
          plain
          class="btn"
          @click="pre"
          >返回前一页
        </el-button>
        <span>提示：请您在UML图绘制完成后，记得导出并上传文件！</span>
        <el-button
          style="margin-top: -0.5%; margin-left: 1%"
          size="large"
          type="primary"
          class="btn"
          plain
          @click="dialogFormVisible = true"
          >上传UML图
        </el-button>
      </el-row>
      <el-divider />
      <div class="main">
        <iframe src="http://101.42.173.97:8080/draw" frameborder="0"></iframe>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { File } from "../api/file.js";
import { Project } from "../api/project.js";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const dialogTableVisible = ref(false);
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";

const pre = () => {
  router.go(-1);
};
const form = reactive({
  name: "",
});

const handleExceed = (files, uploadFiles) => {
  ElMessage.error("您一次最多能一个文件！");
};

let fileId = ref();
let projectId = ref();
let fileName = ref();
function uploadFile(item) {
  let file = item.file;
  console.log(file);
  let data = new FormData();
  data.append("file", file);
  data.append("type", 4);
  File.uploadFile(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        fileId.value = res.data.id;
        ElMessage.success("上传成功");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("上传失败，请检查网络");
    });
}

function addUML() {
  let data = new FormData();
  data.append("fileId", fileId.value);
  data.append("name", fileName.value);
  data.append("projectId", projectId.value);
  Project.addUML(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        ElMessage("添加UML图成功！");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("添加UML图失败");
    });
}

function getBasicInfo() {
  projectId.value = parseInt(router.currentRoute.value.query.id);
  fileName.value = router.currentRoute.value.query.name;
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
  width: 100%;
  height: 100%;
}

iframe {
  width: 100%;
  height: 100%;
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
  width: 9%;
  font-weight: 550;
}

.btn:hover {
  background: #063273;
  color: #f2f2f2;
}
</style>
