<template>
  <div class="wrap">
    <div class="form">
      <div class="left">
        <video src="./video.mp4" muted loop autoplay></video>
      </div>
      <el-form
        ref="registerFormRef"
        :model="account"
        :rules="rules"
        class="right"
      >
        <div class="right-con">
          <h1>注册</h1>
          <h3>邮箱</h3>
          <el-form-item prop="email" class="text">
            <el-input v-model="account.email" />
          </el-form-item>
          <h3>密码</h3>
          <el-form-item prop="password" class="text">
            <el-input
              v-model="account.password"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <h3>确认密码</h3>
          <el-form-item prop="password2" class="text">
            <el-input
              v-model="account.password2"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm(registerFormRef)"
              class="btn"
              >注册</el-button
            >
            <!-- <el-button @click="resetForm(registerFormRef)">重置内容</el-button> -->
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
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
        if (!registerFormRef.value) {
          return callback("出现问题了呢，重新试试吧！");
        }
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
    if (valid) {
      console.log("submit!");
      const payload = new FormData();
      payload.append("email", account.email);
      payload.append("password", account.password);
      Account.register(payload)
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            ElMessage.success("注册成功！");
            const router = useRouter();
            router.push("/user/login");
          }
        })
        .catch((err) => {
          if (err.response.status === 431) {
            ElMessage.error("邮箱已存在！");
          } else {
            ElMessage.error("注册失败！");
          }
        });
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
  background: rgba(255, 255, 255, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(40px);
  transition: 0.5s ease;
}

.right-con {
  width: 70%;
  height: 85%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

h1 {
  font-size: 40px;
  opcity: "1.0";
  text-align: left;
  color: #001a2d;
  font-weight: bold;
  line-height: 48px;
  padding-bottom: 10px;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

h3 {
  line-height: 32px;
  font-size: 20px;
  font-weight: bold;
  color: #001a2d;

  padding-top: 15px;
  text-align: left;
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
  width: 100%;
  height: 40px;
  line-height: 32px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 15px;
  border: none;
  color: #fdfffe;
  font-size: 20px;
  cursor: pointer;
  margin-top: 50px;
  background-image: linear-gradient(120deg, #76ccff 0%, #00a3ff 100%);
  overflow: hidden;
}

.btn:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
.span {
  position: absolute;
  background: #fff;
  transform: translate(-50%, -50%);
  pointer-events: none;
  border-radius: 50%;
  animation: animate 1s linear infinite;
}
@keyframes animate {
  0% {
    width: 0px;
    height: 0px;
    opacity: 0.5;
  }
  100% {
    width: 500px;
    height: 500px;
    opacity: 0;
  }
}
</style>
