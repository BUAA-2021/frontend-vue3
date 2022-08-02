<template>
  <h2>个人简介页面</h2>
  <el-avatar :src="account.avatar" />
  <h2>{{ account.nickname }}</h2>
  <h2>{{ account.email }}</h2>
  <h2>{{ account.realname }}</h2>
  <h2>{{ account.intro }}</h2>
  <el-button type="primary" @click="dialogFormVisible = true"
    >修改个人信息</el-button
  >
  <el-dialog v-model="dialogFormVisible" title="修改个人信息">
    <el-form :model="userinfoForm" :rules="rules" ref="changeInfoRef">
      <el-form-item label="昵称">
        <el-input v-model="userinfoForm.nickname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="userinfoForm.realname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userinfoForm.email" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(changeInfoRef)"
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

const dialogFormVisible = ref(false);

const changeInfoRef = ref();

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
  nickname: "",
  realname: "",
  email: "",
});

const rules = reactive({
  email: [{ validator: validateEmail, trigger: "blur" }],
});

const submitForm = function (formEl) {
  if (!formEl) return;
  formEl.validate(function (valid) {
    if (valid) {
      dialogFormVisible.value = false;
      console.log("valid");
    }
  });
};

const router = useRouter();
const stateStore = useStateStore();

const account = reactive({
  avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  nickname: "",
  email: "",
  realname: "",
  comment: "",
});

let payload = new FormData();
console.log("stateStore.userId", stateStore.userId);
payload.append("wantId", stateStore.userId);
console.log("payload", payload);
Account.getUser(payload)
  .then((res) => {
    console.log("getUser");
    console.log(res.data);
    account.avatar = res.data.avatar;
    account.nickname = res.data.nickname;
    account.email = res.data.email;
    account.realname = res.data.realname;
    account.intro = res.data.intro;
  })
  .catch((err) => {
    console.log(err);
  });
</script>
