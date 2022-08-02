<template>
  <h2>个人简介页面</h2>
  <el-avatar :src="account.avatar" />
  <h2>昵称：{{ account.nickname }}</h2>
  <h2>邮箱：{{ account.email }}</h2>
  <h2>姓名：{{ account.realname }}</h2>
  <h2>个人简介：{{ account.intro }}</h2>
  <el-button type="primary" @click="infoFormVisible = true"
    >修改个人信息</el-button
  >
  <el-button type="primary" @click="emailFormVisible = true"
    >修改邮箱</el-button
  >
  <el-dialog v-model="infoFormVisible" title="修改个人信息">
    <el-form :model="userinfoForm" ref="changeInfoRef">
      <el-form-item label="昵称">
        <el-input v-model="userinfoForm.nickname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="userinfoForm.realname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input v-model="userinfoForm.intro" type="textarea" autosize />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="infoFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitInfoForm(changeInfoRef)"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="emailFormVisible" title="修改邮箱">
    <el-form :model="emailForm" :rules="emailRule" ref="changeEmailRef">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="emailForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input v-model="emailForm.captcha" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emailFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEmailForm(changeEmailRef)"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { Account } from "../../api/account.js";
import { useStateStore } from "../../stores/state.js";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";

const infoFormVisible = ref(false);
const emailFormVisible = ref(false);

const changeInfoRef = ref();
const changeEmailRef = ref();

const router = useRouter();
const stateStore = useStateStore();
const userId = useStorage("userId");

const account = reactive({
  avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  nickname: "",
  email: "",
  realname: "",
  intro: "",
});

onMounted(() => {
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
    })
    .catch((err) => {
      console.log(err);
    });
});

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

const userinfoForm = reactive({
  nickname: account.nickname,
  realname: account.realname,
  intro: account.intro,
});

const emailForm = reactive({
  email: "",
  captcha: "",
});

const emailRule = reactive({
  email: [{ validator: validateEmail, trigger: "blur" }],
});

const submitInfoForm = function (formEl) {
  if (!formEl) return;
  formEl.validate(function (valid) {
    if (valid) {
      let payload = new FormData();
      payload.append("id", userId.value);
      payload.append("nickname", userinfoForm.nickname);
      payload.append("realname", userinfoForm.realname);
      payload.append("intro", userinfoForm.intro);
      Account.editInfo(payload)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            ElMessage.success("修改个人信息成功！");
            infoFormVisible.value = false;
            location.reload();
          }
        })
        .error((err) => {
          console.log(err);
          ElMessage.error("修改个人信息失败！");
          infoFormVisible.value = false;
        });
    }
  });
};

const submitEmailForm = function (formEl) {
  if (!formEl) return;
  formEl.validate(function (valid) {
    if (valid) {
      let payload = new FormData();
      payload.append("id", userId.value);
      payload.append("email", emailForm.email);
      Account.editEmail(payload)
        .then((res) => {
          console.log(res);
          ElMessage.success("修改邮箱成功！");
        })
        .error((err) => {
          console.log(err);
          ElMessage.error("修改邮箱失败！");
        });
      emailFormVisible.value = false;
    }
  });
};
</script>
