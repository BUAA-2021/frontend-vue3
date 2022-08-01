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

<script setup>
import { reactive, ref } from "vue";
import { Account } from "../../api/account.js";

const registerFormRef = ref();

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
        registerFormRef.value.validateField("password2");
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
  email: "",
  password: "",
  password2: "",
});

const rules = reactive({
  email: [{ validator: validateEmail, trigger: "blur" }],
  password: [{ validator: validatePassword, trigger: "blur" }],
  password2: [{ validator: validatePassword2, trigger: "blur" }],
});

const submitForm = function (formEl) {
  if (!formEl) return;
  formEl.validate(function (valid) {
    // console.log(account.email);
    // console.log(account.password);
    // console.log(account.password2);
    if (valid) {
      console.log("submit!!");
      const payload = new FormData();
      payload.append("email", account.email);
      payload.append("password", account.password);
      console.log("owo1");
      Account.register(payload)
        .then((res) => {
          if (res.status === 200) {
            ElMessage.success("注册成功！");
            const router = useRouter();
            router.push("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          if (res.status === 431) {
            ElMessage.error("邮箱已存在！");
          } else {
            ElMessage.error("注册失败！");
          }
        });
      console.log("owo2");
    } else {
      console.log("error submit!!!");
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
