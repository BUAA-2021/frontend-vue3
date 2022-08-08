<template>
  <el-container class="wrap">
    <SideBar />
    <el-main class="main0">
      <template v-if="loading">
        <Loading />
      </template>
      <div v-else class="main">11111111</div>
    </el-main>
  </el-container>
</template>

<script setup></script>

<style scoped>
.wrap {
  background-color: #f8fefc;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  backdrop-filter: blur(20px);
  transition: 0.3s;
}
sideBar {
  z-index: 10;
  position: absolute;
  top: 30px;
  left: 30px;
}
.main {
  margin-left: 10%;
  margin-top: 1%;
}

.card {
  margin-top: 4vh;
  height: "5vh";
}

.cardimg {
  width: 100%;
  height: 200px;
}

.cardimg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bottom {
  margin-top: 5%;
}
</style>
