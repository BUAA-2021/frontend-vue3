<template>
  <el-form
    ref="loginFormRef"
    :model="account"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    label-position="top"
    size="large"
  >
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="account.email" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(loginFormRef)"
        >登录</el-button
      >
      <el-button @click="resetForm(loginFormRef)">重置内容</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useStateStore } from "../../stores/state";
import { Account } from "../../api/account";

const loginFormRef = ref();
const stateStore = useStateStore();

const validateEmail = function (rule, value, callback) {
  if (value === "") {
    return callback(new Error("邮箱不能为空！"));
  } else {
    const emailPattern = /^\w+@[0-9a-z]+\.[a-z]+$/;
    if (!emailPattern.test(value)) {
      callback(new Error("请输入正确的邮箱格式！"));
    }
    callback();
  }
};

const validatePassword = function (rule, value, callback) {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};

const account = reactive({
  email: "",
  password: "",
});

const rules = reactive({
  email: [{ validator: validateEmail, trigger: "blur" }],
  password: [{ validator: validatePassword, trigger: "blur" }],
});

const submitForm = function (formEl) {
  if (!formEl) return;
  formEl.validate(function (valid) {
    if (valid) {
      console.log("submit!");
      const payload = new FormData();
      payload.append("email", account.email);
      payload.append("password", account.password);
      Account.Login(payload)
        .then((res) => {
          if (res.status === 200) {
            stateStore.loginAction(payload);
            ElMessage.success("登录成功！");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 431) {
            ElMessage.error("用户名或密码错误！");
          }
        });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = function (formEl) {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style></style>
