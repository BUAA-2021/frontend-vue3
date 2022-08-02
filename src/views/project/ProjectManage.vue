<template>
  <div class="main">
    <el-row>
      <el-col
        v-for="(item, index) in projectList"
        :key="item"
        :span="4"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>{{ item.name }}</span>
              <el-button class="button" text>查看项目</el-button>
            </div>
          </template>
          <div class="card-brief">创建者：{{ item.founder }}</div>
          <div class="text item">
            {{ item.description }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
let projectList = ref([
  {
    name: "test项目",
    description: "This is a test project!",
    founder: "Ando",
  },
  {
    name: "test项目",
    description: "This is a test project!",
    founder: "Ando",
  },
]);
</script>

<style scoped>
.main {
  margin-left: 15%;
  margin-top: 5%;
}

.card-brief {
  color: #999;
  margin-bottom: 3%;
}
</style>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 300px;
}
</style>
