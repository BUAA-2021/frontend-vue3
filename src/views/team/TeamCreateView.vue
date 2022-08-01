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
    <el-button style="margin-top: 3%" type="primary" plain>注册</el-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { User } from "../../api/user.js";
import { onMounted } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

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

const imageUrl = ref("");

function handleAvatarSuccess(response, uploadFile) {
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
}

function uploadIcon(params) {
  ElMessage.success("上传成功！");
  //   var that = this
  //   this.$api.common
  //     .uploadImage(data)
  //     .then(res => {
  //       console.log(res)
  //       if (res.code == 200) {
  //         this.file.imgId = res.data.id
  //         that.$message.success('上传成功')
  //       } else {
  //         that.imageUrl = ''
  //         that.$message.error(res.exc || '上传失败，请检查网络')
  //       }
  //     })
  //     .catch(error => {
  //       console.log('上传图片失败')
  //       console.log(error)
  //       that.imageUrl = ''
  //       that.$message.error('上传失败，请检查网络')
  //     })
}

function beforeAvatarUpload(rawFile) {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
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
  width: 4vw;
  height: 4vh;
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
