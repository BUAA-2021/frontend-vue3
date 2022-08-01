<template>
  <el-form
    ref="registerFormRef"
    :model="account"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    label-position="top"
    size="large"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="account.username" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="account.email" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="确认密码" prop="password2">
      <el-input
        v-model="account.password2"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(registerFormRef)"
        >注册</el-button
      >
      <el-button @click="resetForm(registerFormRef)">重置内容</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";

const registerFormRef = ref<FormInstance>();

const validateUsername = function (rule, value, callback) {
  const usernamePattern = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
  if (!value) {
    return callback(new Error("用户名不能为空"));
  } else if (!usernamePattern.test(value)) {
    callback(new Error("用户名由中英文、数字或下划线组成"));
  } else {
    callback();
  }
};

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

const validatePassword = function (rule, value, callback) {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    const passwordPattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;
    if (!passwordPattern.test(value)) {
      callback(new Error("请输入8-18位数字和字母组合的密码"));
    } else {
      if (account.password2 !== "") {
        if (!registerFormRef.value) return;
        registerFormRef.value.validateField("password2", () => null);
      }
      callback();
    }
  }
};

const validatePassword2 = function (rule, value, callback) {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== account.password) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};

const account = reactive({
  username: "",
  email: "",
  password: "",
  password2: "",
});

const rules = reactive({
  username: [{ validator: validateUsername, trigger: "blur" }],
  email: [{ validator: validateEmail, trigger: "blur" }],
  password: [{ validator: validatePassword, trigger: "blur" }],
  password2: [{ validator: validatePassword2, trigger: "blur" }],
});

const submitForm = function (formEl) {
  if (!formEl) return;
  formEl.validate(function (valid) {
    if (valid) {
      console.log("submit!");
      var payload = new FormData();
      payload.append("username", account.username);
      payload.append("email", account.email);
      payload.append("password", account.password);
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
