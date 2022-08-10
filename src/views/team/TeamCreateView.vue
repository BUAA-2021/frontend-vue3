<template>
  <el-container class="wrap">
    <el-main class="main0">
      <div class="main">
        <el-row>
          <el-col :span="8" class="createcard">
            <el-row>
              <el-col class="title">
                <h1>创建团队</h1>
              </el-col>
            </el-row>
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
            <el-input
              class="input"
              style="width: 240px; margin-top: 5%"
              size="large"
              v-model="teamName"
              placeholder="输入团队名称"
            />

            <el-select
              filterable
              :filter-method="dataFilter"
              multiple
              v-model="users"
              placeholder="搜索昵称以邀请成员"
              size="large"
              style="width: 240px; margin-top: 5%; display: block"
            >
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.nName"
                :value="item.id"
              >
                <span style="float: left">{{ item.nName }}</span>
                <span
                  style="
                    float: right;
                    color: var(--el-text-color-secondary);
                    font-size: 13px;
                  "
                  >{{ item.email }}</span
                >
              </el-option>
            </el-select>

            <el-button
              style="margin-top: 5%; margin-bottom: 3%"
              type="primary"
              class="btn"
              plain
              @click="registerTeam()"
              >注册</el-button
            >
          </el-col>
          <el-col span="5"
            ><div class="right">
              <img src="..\..\assets\teamcreate.jpg" /></div
          ></el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from "vue";
import { User } from "../../api/user.js";
import { onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { File } from "../../api/file.js";
import { Team } from "../../api/team.js";
import { useRouter } from "vue-router";

const router = useRouter();
let teamName = ref();
let users = ref([]);
let userList = ref([
  // {
  //   id: 1,
  //   nName: "ando",
  // },
  // {
  //   id: 2,
  //   nName: "undo",
  // },
]);
let imageUrl = ref("");
let imgId = ref();
let teamId = ref();
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
        imgId = res.data.id;
        ElMessage.success("上传成功");
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
    ElMessage.error("上传的头像文件需要为.jpg或者.png格式!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("上传的头像文件不能超过2MB!");
    return false;
  }
  imageUrl.value = URL.createObjectURL(rawFile);
  console.log(imageUrl.value);
  return true;
}

function dataFilter(val) {
  let data = new FormData();
  data.append("str", val);

  console.log(val);

  User.getSearchList(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        userList.value = res.data.totUserList;
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("获取搜索用户列表失败！");
    });
}

function registerTeam() {
  let rawUser = [];
  for (let i = 0; i < users.value.length; i++) {
    rawUser[i] = users.value[i];
  }

  let data = new FormData();
  data.append("logo", imgId);
  data.append("name", teamName.value);
  data.append("users", rawUser);

  console.log(rawUser);
  Team.createTeam(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        teamId.value = res.data.id;
        router.push({
          path: `/team/${teamId.value}`,
        });
        ElMessage.success("注册成功");
      }
    })
    .catch((error) => {
      console.log("注册失败");
      console.log(error);
      ElMessage.error("注册失败");
    });
}

onMounted(() => {
  // User.getUserList().then((res) => {
  //   console.log(res);
  //   // console.log(res.data);
  //   userList.value = res.data.data;
  // });
});
</script>

<style scoped>
.wrap {
  background-color: #f8fefc;
  width: 100%;
  height: calc(92% - 2px);
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
.input {
  margin-top: 2%;
  width: 20%;
}
</style>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-color: #063273;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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

.createcard {
  width: 400px;
  background-color: #cfe1f7;
  padding: 12px 25px;
  border-radius: 8px;
  overflow: hidden;
}

.btn {
  display: inline-block;
  padding: 12px 50px;
  color: #468bcd;
  border: 3px solid #468bcd;
  text-align: center;
  height: 35px;
  border-radius: 10px;
  margin-top: 4vh;
  background: none;
  transition: 0.3s linear;
}

.btn:hover {
  background: #468bcd;
  color: #f2f2f2;
}

.right {
  width: 450px;
  height: 350px;
  margin-left: 20%;
}

.right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.title {
  color: #063273;
}
</style>
