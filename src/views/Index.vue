<template>
  <body>
    <el-container class="wrapper">
      <el-main>
        <el-carousel :interval="4000" type="card" height="600px" weight="100%">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <el-button type="info">Info</el-button></el-main
      >
    </el-container>
  </body>
</template>

<script setup>
import Header from "../components/common/Header.vue";
</script>

<style scoped>
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
