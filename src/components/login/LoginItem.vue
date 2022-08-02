<template>
  <div class="wrap">
    <div class="form">
      <div class="left">
        <video src=".\video.mp4" muted loop autoplay></video>
      </div>
      <el-form ref="loginFormRef" :model="account" :rules="rules" class="right">
        <div class="right-con">
          <h1>NEW HERE LOG IN</h1>
          <h3>EMAIL</h3>
          <el-form-item prop="email" class="text">
            <el-input v-model="account.email" />
          </el-form-item>
          <h3>PASSWORD</h3>
          <el-form-item prop="password" class="text">
            <el-input
              v-model="account.password"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm(loginFormRef)"
              class="btn"
              >登录</el-button
            >
            <el-button @click="resetForm(loginFormRef)" class="btn"
              >重置内容</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useStateStore } from "../../stores/state";
import { Account } from "../../api/account";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
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
            stateStore.loginAction({
              userName: "",
              userToken: res.data,
              userId: 0,
              userEmail: account.email,
              userAvatar: "",
            });
            ElMessage.success("登录成功！");
            router.push("/");
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

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overflow: hidden;
}
.wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  width: 900px;
  height: 560px;
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
}

.left {
  width: 500px;
  height: 560px;
}

.left video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.right {
  width: 400px;
  height: 560px;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-con {
  width: 70%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

h1 {
  font-size: 26px;
  color: #70b4e3;
  font-weight: 400;
  padding-bottom: 10px;
}

h3 {
  font-size: 12px;
  font-weight: 400;
  color: #70b4e3;
  padding: 20px 0;
}

.text {
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid #70b4e3;
  color: #366ae6;
  background-color: rgba(0, 0, 0, 0);
}

.btn {
  width: 45%;
  height: 40px;
  border-radius: 20px;
  border: none;
  color: #fdfffe;
  font-size: 16px;
  cursor: pointer;
  margin-top: 50px;
  background-image: linear-gradient(
    120deg,
    #76ccff 0%,
    #00a3ff 50%,
    #006fbf 100%
  );
}

.btn:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
</style>
