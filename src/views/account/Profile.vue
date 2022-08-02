<template>
  <h2>个人简介页面</h2>
  <el-avatar :src="avatar" />
  <h2>{{ account.nickname }}</h2>
  <h2>{{ account.email }}</h2>
  <h2>{{ account.realname }}</h2>
  <h2>{{ account.comment }}</h2>
  <el-button type="primary">修改个人信息</el-button>
  
</template>

<script setup>
import { Account } from "../../api/account.js";
import { useStateStore } from "../../stores/state.js";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const stateStore = useStateStore();

const account = reactive({
  avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  nickname: "",
  email: "",
  realname: "",
  comment: "",
});

// if (stateStore.isLoggedIn) {
const form = new FormData();
form.append("wantId", stateStore.userId);
form.append("currentId", stateStore.userId);
form.append("token", stateStore.userToken);
Account.getUser(form)
  .then((res) => {
    console.log("getUser");
    console.log(res.data);
    account.avatar = res.data.avatar;
    account.nickname = res.data.nickname;
    account.email = res.data.email;
    account.realname = res.data.realname;
    account.comment = res.data.comment;
  })
  .catch((err) => {
    console.log(err);
  });
// } else {
//   ElMessage.error("请先登录！");
//   router.push("/user/login");
// }
</script>
