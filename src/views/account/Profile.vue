<template>
  <template v-if="loading">
  <Loading/>
  </template>
  <body v-else>
    <div class="profile-card">
      <div class="card-header">
        <div class="pic">
          <el-avatar :size="75" :src="account.avatar" />
        </div>
        <div class="name">{{ account.nickname }}</div>
        <div class="desc">{{ account.intro }}</div>
        <div class="sm">
          <div class="smm">
            <span>邮箱：{{ account.email }}</span>
          </div>
          <div class="smm">
            <span>姓名：{{ account.realname }}</span>
          </div>
        </div>
        <el-button
          type="primary"
          class="contact-btn"
          @click="infoFormVisible = true"
          >修改个人信息</el-button
        >
      </div>
      <div class="card-footer">
        <div class="numbers">
          <div class="border"></div>
          <div class="item">
            <el-upload
              class="avatar-uploader"
              action=""
              name="file"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :http-request="uploadAvatar"
            >
              <el-button type="primary" class="contact-btn0"
                >上传头像</el-button
              >
            </el-upload>
          </div>
          <div class="border"></div>
          <div class="item">
            <el-button
              type="primary"
              @click="passwordFormVisible = true"
              class="contact-btn0"
              >修改密码</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </body>
  <el-dialog v-model="infoFormVisible" title="修改个人信息">
    <el-form
      :model="userinfoForm"
      label-width="100px"
      label-position="top"
      ref="changeInfoRef"
    >
      <el-form-item label="昵称">
        <el-input v-model="userinfoForm.nickname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="userinfoForm.realname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input
          v-model="userinfoForm.intro"
          type="textarea"
          :autosize="{
            minRows: 4,
          }"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button 
      @click="infoFormVisible = false"> 
      取消</el-button>
      <el-button
        type="primary"
        @click="submitInfoForm(changeInfoRef)"
      >
        确认</el-button
      >
    </template>
  </el-dialog>
  <el-dialog v-model="emailFormVisible" title="修改邮箱">
    <el-form 
    :model="emailForm" 
    :rules="emailRule" 
    label-width="100px"
    label-position="top"
    ref="changeEmailRef">
      <el-form-item label="新邮箱" prop="email">
        <el-input
          v-model="emailForm.email"
          autocomplete="off"
          :disabled="haveEmailSendCode"
        />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="emailForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="emailForm.code" autocomplete="off">
          <template #append>
            <el-button
              type="primary"
              @click="sendCode(1)"
              :disabled="haveEmailSendCode || !emailValid"
              >获取验证码</el-button
            >
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="emailFormVisible = false">取消</el-button>
      <el-button type="primary" @click="submitEmailForm(changeEmailRef)"
        >确认</el-button
      >
    </template>
  </el-dialog>
  <el-dialog v-model="passwordFormVisible" title="修改密码">
    <el-form
      :model="passwordForm"
      :rules="passwordRule"
      ref="changePasswordRef"
      label-width="100px"
      label-position="top"
    >
      <h2>您当前邮箱为：{{ account.email }}</h2>
      <br/>
      <br/>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="passwordForm.password" type="password" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="password2">
        <el-input v-model="passwordForm.password2" type="password" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="passwordForm.code" autocomplete="off">
          <template #append>
            <el-button
              type="primary"
              @click="sendCode(2)"
              :disabled="havePasswordSendCode || !emailValid"
              >获取验证码</el-button
            >
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="passwordFormVisible = false">取消</el-button>
      <el-button type="primary" @click="submitPasswordForm(changePasswordRef)"
        >确认</el-button
      >
    </template>
  </el-dialog>
</template>

<script setup>
import { Account } from "../../api/account.js";
import { File } from "../../api/file.js";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { useStateStore } from "../../stores/state.js";
import { useStorage } from "@vueuse/core";
const infoFormVisible = ref(false);
const emailFormVisible = ref(false);
const passwordFormVisible = ref(false);
const state = useStateStore();
const loading = ref(true)
const changeInfoRef = ref();
const changeEmailRef = ref();
const changePasswordRef = ref();
const router = useRouter();
const userId = useStorage("userId");

const haveEmailSendCode = ref(false);
const havePasswordSendCode = ref(false);

const account = reactive({
  avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  nickname: "",
  email: "",
  realname: "",
  intro: "",
});

const getUserInfo = () => {
  let payload = new FormData();
  payload.append("wantId", userId.value);
  Account.getUser(payload)
    .then((res) => {
      console.log("getUser");
      console.log(res.data);
      account.avatar = res.data.avatar;
      account.nickname = res.data.nickname;
      account.email = res.data.email;
      account.realname = res.data.realname;
      account.intro = res.data.intro;
      userinfoForm.nickname = res.data.nickname;
      userinfoForm.realname = res.data.realname;
      userinfoForm.intro = res.data.intro;
      emailForm.email = res.data.email;
      state.userAvatar = res.data.avatar;
      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
    });
};
onMounted(() => {
  getUserInfo();
});

let imageUrl = ref("");
let imgId = ref();
let teamId = ref();

function handleAvatarSuccess(response, uploadFile) {
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
  if (response.success == true) {
    imgId = res.data.id;
    imageUrl.value = res.url;
    ElMessage.success("头像上传成功");
    getUserInfo();
  }
}

function uploadAvatar(params) {
  let data = new FormData();
  data.append("file", params.file);
  data.append("type", 2);
  console.log(data);
  File.uploadFile(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        imgId = res.data.id;
        account.avatar = res.data.url;
        localStorage.setItem("userAvatar", res.data.url);
        ElMessage.success("上传头像成功");
        getUserInfo();
      } else {
        imageUrl.value = "";
        ElMessage.error("上传失败，请检查网络");
      }
    })
    .catch((error) => {
      console.log("上传头像失败");
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

const validateEmail = function (rule, value, callback) {
  if (value === "") {
    return callback(new Error("邮箱不能为空！"));
  } else {
    const emailPattern =
      /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!emailPattern.test(value)) {
      callback(new Error("请输入正确的邮箱格式！"));
    }
    callback();
  }
};

const validateCode = function (rule, value, callback) {
  if (value === "") {
    return callback(new Error("验证码不能为空！"));
  } else {
    callback();
  }
};

const userinfoForm = reactive({
  nickname: "",
  realname: "",
  intro: "",
});

const emailForm = reactive({
  email: "",
  code: "",
});

const passwordForm = reactive({
  password: "",
  password2: "",
  code: "",
});

const validatePassword = function (rule, value, callback) {
  if (value === "") {
    callback(new Error("请输入新密码"));
  } else {
    const passwordPattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;
    if (!passwordPattern.test(value)) {
      callback(new Error("请输入8-18位数字和字母组合的密码"));
    } else {
      if (passwordForm.password2 !== "") {
        if (!changePasswordRef.value) {
          return callback("出现问题了呢，重新试试吧！");
        }
        changePasswordRef.value.validateField("password2");
      }
      callback();
    }
  }
};

const validatePassword2 = function (rule, value, callback) {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== passwordForm.password) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};

const emailRule = reactive({
  email: [{ validator: validateEmail, trigger: "blur" }],
  code: [{ validator: validateCode, trigger: "blur" }],
});

const passwordRule = reactive({
  password: [{ validator: validatePassword, trigger: "blur" }],
  password2: [{ validator: validatePassword2, trigger: "blur" }],
  code: [{ validator: validateCode, trigger: "blur" }],
});

const emailValid = computed(() => {
  if (account.email === "") {
    return false;
  } else {
    const emailPattern =
      /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return emailPattern.test(account.email);
  }
});

const sendCode = function (type) {
  const payload = new FormData();
  if (type === 1) {
    payload.append("email", emailForm.email);
  } else if (type === 2) {
    payload.append("email", account.email);
  }
  payload.append("type", type);
  Account.sendCode(payload)
    .then((res) => {
      console.log(res.data);
      if (res.data.status === 200) {
        ElMessage.success("验证码已发送，请注意查收！");
        if (type === 1) {
          haveEmailSendCode.value = true;
        } else if (type === 2) {
          havePasswordSendCode.value = true;
        }
      } else if (res.data.status === 331) {
        ElMessage.error("发送验证码失败，请检查您的邮箱是否正确！");
      } else if (res.data.status === 332) {
        ElMessage.error("该邮箱已被注册，邮箱不可用，请重新输入！");
      } else {
        ElMessage.error("获取验证码失败！");
      }
    })
    .catch((err) => {
      console.log(err);
      ElMessage.error("获取验证码失败！");
    });
};

const submitInfoForm = function (formEl) {
  if (!formEl) return;
  formEl.validate(function (valid) {
    if (valid) {
      const payload = new FormData();
      payload.append("id", userId.value);
      payload.append("nickname", userinfoForm.nickname);
      payload.append("realname", userinfoForm.realname);
      payload.append("intro", userinfoForm.intro);
      Account.editInfo(payload)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            ElMessage.success("修改个人信息成功！");
            setTimeout(() => {
              location.reload();
            }, 1500);
          }
        })
        .error((err) => {
          console.log(err);
          ElMessage.error("修改个人信息失败！");
        });
      infoFormVisible.value = false;
    }
  });
};

const submitEmailForm = function (formEl) {
  if (!formEl) return;
  formEl.validate(function (valid) {
    if (valid) {
      const payload = new FormData();
      payload.append("currentEmail", account.email);
      payload.append("newEmail", emailForm.email);
      payload.append("code", emailForm.code);
      payload.append("password", emailForm.password);
      Account.changeEmail(payload)
        .then((res) => {
          if (res.data.status === 200) {
            ElMessage.success("修改邮箱成功！");
            const token = useStorage("token");
            token.value = res.data.token;
            setTimeout(() => {
              location.reload();
            }, 1500);
          } else if (res.data.status === 341) {
            ElMessage.error("验证码错误！");
            emailForm.code = "";
          } else if (res.data.status === 342) {
            ElMessage.error("验证码失效，请重新获取！");
            emailForm.code = "";
          } else if (res.data.status === 343) {
            ElMessage.error("密码错误！");
            emailForm.password = "";
          } else {
            ElMessage.error("修改邮箱失败！");
            emailForm.code = "";
          }
        })
        .error((err) => {
          console.log(err);
          ElMessage.error("修改邮箱失败！");
        });
      emailFormVisible.value = false;
    }
  });
};

const submitPasswordForm = function (formEl) {
  if (!formEl) return;
  formEl.validate(function (valid) {
    if (valid) {
      const payload = new FormData();
      payload.append("email", account.email);
      payload.append("password", passwordForm.password);
      payload.append("code", passwordForm.code);
      Account.changePassword(payload)
        .then((res) => {
          if (res.data.status === 200) {
            ElMessage.success("修改密码成功！");
            setTimeout(() => {
              location.reload();
            }, 1500);
          } else if (res.data.status === 341) {
            ElMessage.error("验证码错误！");
            passwordForm.code = "";
          } else {
            ElMessage.error("修改密码失败！");
            passwordForm.code = "";
          }
        })
        .error((err) => {
          console.log(err);
          ElMessage.error("修改密码失败！");
        });
      emailFormVisible.value = false;
    }
  });
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: "Ubuntu", sans-serif;
  box-sizing: border-box;
  text-decoration: none;
}

body {
  height: 100vh;
  background-size: cover;
  display: flex;

  align-items: center;
  justify-content: center;
}

.profile-card {
  width: 400px;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
}

.card-header {
  background: #2b3954;
  padding: 60px 40px;
}

.pic {
  display: inline-block;
  padding: 8px;
  background: linear-gradient(130deg, #74b9ff, #e66767);
  margin: auto;
  border-radius: 50%;
  background-size: 200% 200%;
  animation: animated-gradient 2s linear infinite;
}

@keyframes animated-gradient {
  25% {
    background-position: left bottom;
  }
  50% {
    background-position: right bottom;
  }
  75% {
    background-position: right top;
  }
  100% {
    background-position: left top;
  }
}

el-avatar {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.name {
  color: #f2f2f2;
  font-size: 28px;
  font-weight: 600;
  margin: 10px 0;
}

.desc {
  font-size: 18px;
  color: #9ad4d5;
}

.sm {
  justify-content: center;
  display: block;
  margin: 20px 0;
  height: 75px;
}

.sm a {
  color: #f2f2f2;
  width: 56px;
  font-size: 22px;
  transition: 0.3s linear;
}

.sm a:hover {
  color: #9ad4d5;
}

.contact-btn {
  display: inline-block;
  padding: 12px 50px;
  color: #9ad4d5;
  border: 2px solid #9ad4d5;
  text-align: center;
  height: 35px;
  border-radius: 6px;
  margin-top: 20px;
  background: none;
  transition: 0.3s linear;
}

.contact-btn:hover {
  background: #9ad4d5;
  color: #f2f2f2;
}

.contact-btn0 {
  display: inline-block;
  padding: 12px 50px;
  color: #2b3954;
  border: 0px solid #9ad4d5;
  text-align: center;
  height: 35px;
  border-radius: 6px;
  background: none;
  transition: 0.3s linear;
}

.contact-btn0:hover {
  background: #9ad4d5;
  color: #2b3954;
}

.card-footer {
  background: #f4f4f4;
  padding: 20px 10px;
}

.numbers {
  display: flex;
  align-items: center;
}
.smm {
  color: #f2f2f2;
  font-size: 15px;
  font-weight: 600;
  margin: 30px 0;
}
.item {
  flex: 1;
  text-transform: uppercase;
  font-size: 13px;
  color: #e66767;
}

.item span {
  display: block;
  color: #2c3a47;
  font-size: 30px;
}

.border {
  width: 1px;
  height: 30px;
  background: #bbb;
}
</style>
