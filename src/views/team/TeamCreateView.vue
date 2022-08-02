<template>
  <div class="main">
    <el-row>
      <el-col :span="5">
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
    <el-input class="input" v-model="teamName" placeholder="输入团队名称" />
    <el-select
      v-model="users"
      filterable
      multiple
      placeholder="搜索成员昵称"
      style="width: 240px; margin-top: 3%; display: block"
    >
      <el-option
        v-for="item in userList"
        :key="item.id"
        :label="item.nName"
        :value="item.id"
      />
    </el-select>
    <el-button
      style="margin-top: 3%"
      type="primary"
      plain
      @click="registerTeam()"
      >注册</el-button
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
import { User } from "../../api/user.js";
import { onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { File } from "../../api/file.js";
import { Team } from "../../api/team.js";
import { useStorage } from "@vueuse/core";

let teamName = ref();
let users = ref([]);
let userList = ref([
  {
    id: 1,
    nName: "ando",
  },
  {
    id: 2,
    nName: "undo",
  },
]);
let imageUrl = ref("");
let imgId = ref();
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
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  imageUrl.value = URL.createObjectURL(rawFile);
  console.log(imageUrl.value);
  return true;
}

function registerTeam() {
  const token = useStorage("token");
  let rawUser = [];
  for (let i = 0; i < users.value.length; i++) {
    rawUser[i] = users.value[i];
  }

  let data = {
    logo: imgId,
    name: teamName.value,
    users: rawUser,
    token: token.value,
  };
  console.log(data);
  Team.createTeam(data)
    .then((res) => {
      if (res.state == 200) {
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
  User.getUserList().then((res) => {
    console.log(res);
    // console.log(res.data);
    userList.value = res.data.data;
  });
});
</script>

<style scoped>
.main {
  margin-left: 15%;
  margin-top: 5%;
}

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

<style>
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
