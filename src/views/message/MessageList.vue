<template>
  <el-container class="wrap">
    <SideBar />
    <template v-if="loading">
      <Loading />
    </template>
    <el-main v-else class="main0">
      <div class="main">
        <el-row :gutter="12">
          <el-col :span="8">
            <el-card shadow="always"> Always </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover"> Hover </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="never"> Never </el-card>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script setup></script>

<style scoped>
h1 {
  font-size: 35px;
  margin-left: 0;
}

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
  margin-top: 5%;
}
</style>
