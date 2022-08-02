<template>
  <h2>个人简介页面</h2>
  <el-avatar :src="avatar" />
  <h2>{{ account.nickname }}</h2>
  <h2>{{ account.email }}</h2>
  <h2>{{ account.realname }}</h2>
  <h2>{{ account.comment }}</h2>
</template>

<script setup>
import { stat } from "fs";
import { Account } from "../../api/account.js";
import { useStateStore } from "../../stores/state.js";

const route = useRoute();
const stateStore = useStateStore();

const account = reactive({
  avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  nickname: "",
  email: "",
  realname: "",
  comment: "",
});

if (stateStore.isLoggedIn) {
  Account.getUser(stateStore.userId)
    .then((res) => {
      console.log("getCurrentUser");
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
}
</script>
