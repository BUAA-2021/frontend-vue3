<template>
  <!-- <el-container class="wrapper">
    <el-main>
      <el-carousel :interval="4000" type="card" height="600px" weight="100%">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <el-button type="info" @click="toLogin">Info</el-button>
    </el-main>
  </el-container> -->
  <div id="bg"></div>
  <div id="overlay"></div>
  <div id="main">
    <header id="header">
      <div class="right">
        <img src="..\assets\iconmiao.png" @click="toLogin" />
      </div>
      <h1>MO SHU</h1>
      <p>团队协作 &nbsp;&bull;&nbsp; 释放创意 &nbsp;&bull;&nbsp; 及时高效</p>
      <el-button type="info" @click="toLogin" class="btn"
        ><span class="title">立即试用</span></el-button
      >
      <div height="100px"></div>
    </header>
  </div>
</template>

<script setup>
import Header from "../components/common/Header.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const toLogin = () => {
  router.push("/user/login");
};
</script>

<style scoped>
.btn {
  padding: 12px 50px;
  color: black;
  border: 2px solid #cfe1f7;
  background: white;
  opacity: 0.8;
  text-align: center;
  height: 35px;
  border-radius: 30px;
  margin-top: 40px;
  transition: 0.3s linear;
  width: 8%;
  font-weight: 550;
  font-size: 20px;
}

.title {
  opacity: 1;
}
.btn:hover {
  background: #063273;
  color: #f2f2f2;
}
.wrapper {
  background-color: #f8fefc;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  backdrop-filter: blur(20px);
  transition: 0.3s;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background: url("../assets/teamcreate.jpg");
  background-size: cover;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

<style src="../../src/assets/css/main.css" scoped></style>
