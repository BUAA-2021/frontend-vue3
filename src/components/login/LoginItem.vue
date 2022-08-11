<template>
  <div class="wrap">
    <div class="form">
      <div class="left">
        <video src="./loginvideo.mp4" muted loop autoplay></video>
      </div>
      <el-form ref="loginFormRef" :model="account" :rules="rules" class="right">
        <div class="right-con">
          <h1>登录</h1>
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
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm(loginFormRef)"
              class="btn"
              >登录</el-button
            >
            <el-button @click="toRegister" type="text"
              >还没账号？点我去注册</el-button
            >
            <el-button
              @click="passwordFormVisible = true"
              type="text"
              style="margin-left: 50px"
              >忘记密码</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
  <el-dialog v-model="passwordFormVisible" title="修改密码">
    <el-form
      :model="passwordForm"
      :rules="passwordRule"
      label-position="top"
      ref="changePasswordRef"
    >
      <el-form-item label="请输入您的邮箱" prop="email">
        <el-input
          v-model="passwordForm.email"
          autocomplete="off"
          :disabled="haveSendCode"
        />
      </el-form-item>
      <br />
      <el-form-item label="新密码" prop="password1">
        <el-input
          v-model="passwordForm.password1"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <br />
      <el-form-item label="确认新密码" prop="password2">
        <el-input
          v-model="passwordForm.password2"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <br />
      <el-form-item label="验证码" prop="code">
        <el-input v-model="passwordForm.code" autocomplete="off">
          <template #append>
            <el-button
              type="primary"
              @click="sendCode(2)"
              :disabled="havePasswordSendCode || !emailValid"
              class="btn0"
              >获取验证码</el-button
            >
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="passwordFormVisible = false" class="btn0"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="submitPasswordForm(changePasswordRef)"
          class="btn0"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useStateStore } from "../../stores/state";
import { Account } from "../../api/account";
import { useRouter, useRoute } from "vue-router";
import { Team } from "../../api/team";
const router = useRouter();
const route = useRoute();
const loginFormRef = ref();
const stateStore = useStateStore();
const passwordFormVisible = ref(false);
const changePasswordRef = ref();
const havePasswordSendCode = ref(false);

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

const emailValid = computed(() => {
  if (passwordForm.email === "") {
    return false;
  } else {
    const emailPattern =
      /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return emailPattern.test(passwordForm.email);
  }
});

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

const passwordForm = reactive({
  email: "",
  password1: "",
  password2: "",
  code: "",
});

const rules = reactive({
  email: [{ validator: validateEmail, trigger: "blur" }],
  password: [{ validator: validatePassword, trigger: "blur" }],
});

const validatePassword1 = function (rule, value, callback) {
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
  } else if (value !== passwordForm.password1) {
    callback(new Error("两次输入的密码不一致"));
  } else {
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

const passwordRule = reactive({
  email: [{ validator: validateEmail, trigger: "blur" }],
  password1: [{ validator: validatePassword1, trigger: "blur" }],
  password2: [{ validator: validatePassword2, trigger: "blur" }],
  code: [{ validator: validateCode, trigger: "blur" }],
});

const submitForm = function (formEl) {
  if (!formEl) return;
  formEl.validate(function (valid) {
    if (valid) {
      console.log("submit!");
      const payload = new FormData();
      payload.append("email", account.email);
      payload.append("password", account.password);
      Account.login(payload)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            stateStore.loginAction({
              userNickname: res.data.nickname,
              userRealname: res.data.realname,
              userToken: res.data.token,
              userId: res.data.id,
              userEmail: account.email,
              userAvatar: res.data.avatar,
            });
            ElMessage.success("登录成功！");
            Team.getTeamList()
              .then((res) => {
                console.log(res);
                const code = localStorage.getItem("code");
                console.log("CODE",code);
                if (res.status == 200) {
                  stateStore.setTeamList(res.data.teams); 
                  if (res.data.teams.length > 0) {
                    stateStore.setCurrentTeam(res.data.teams[0]);
                    if(code){
                      localStorage.removeItem("code");
                      router.push(`/doc/prototypePreview/${code}`);
                      return;
                    }
                    router.push(`/team/${res.data.teams[0].id}/teamInfo`);
                  } else {
                    router.push("/team/create");
                  }
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else if (res.status === 431) {
            ElMessage.error("邮箱或密码错误，登录失败！");
          } else {
            ElMessage.error("登录失败！");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 431) {
            ElMessage.error("邮箱或密码错误，登录失败！");
          } else {
            ElMessage.error("登录失败！");
          }
        });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const sendCode = function (type) {
  const payload = new FormData();
  payload.append("email", passwordForm.email);
  payload.append("type", type);
  Account.sendCode(payload)
    .then((res) => {
      console.log(res.data);
      if (res.data.status === 200) {
        ElMessage.success("验证码已发送，请注意查收！");
        havePasswordSendCode.value = true;
      } else if (res.data.status === 331) {
        ElMessage.error("发送验证码失败，请检查您的邮箱是否正确！");
      } else if (res.data.status === 332) {
        ElMessage.error("该邮箱已被注册，邮箱不可用，请重新输入！");
      } else if (res.data.status === 404) {
        ElMessage.error("该邮箱还未被注册，邮箱不可用，请重新输入！");
      } else {
        ElMessage.error("获取验证码失败！");
      }
    })
    .catch((err) => {
      console.log(err);
      ElMessage.error("获取验证码失败！");
    });
};

const submitPasswordForm = function (formEl) {
  if (!formEl) return;
  formEl.validate(function (valid) {
    if (valid) {
      const payload = new FormData();
      payload.append("email", passwordForm.email);
      payload.append("password", passwordForm.password1);
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

const toRegister = function () {
  router.push("/register");
};

const buttons = document.querySelectorAll("btn");
buttons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    console.log("hhhhh");
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;

    let ripples = document.createElement("span");
    ripples.style.left = x + "px";
    ripples.style.top = y + "px";
    this.appendChild(ripples);

    setTimeout(() => {
      ripples.remove();
    }, 1000);
  });
});
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
  height: 90vh;
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
  opacity: 1;
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
  font-size: 16px;
  cursor: pointer;
  margin-top: 50px;
  overflow: hidden;
}

.btn0 {
  width: 100px;
  height: 40px;
  line-height: 32px;
  font-size: 20px;
  border: none;
  font-size: 16px;
  cursor: pointer;
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

:deep(.el-form-item__label) {
  width: 300px;
  line-height: 32px;
  font-size: 20px;
  border: none;
  font-size: 18px;
  font-weight: bold;
  color: #366ae6;
  overflow: hidden;
}
</style>
