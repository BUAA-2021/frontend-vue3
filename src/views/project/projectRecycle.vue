<template>
  <div class="main">
    <el-row>
      <el-col
        v-for="(item, index) in recycleList"
        :key="item"
        :span="6"
        :offset="index > 0 ? 1 : 0"
      >
        <el-card
          style="border: 0px"
          shadow="always"
          :body-style="{ padding: '0px' }"
        >
          <el-image :src="item.logo" fit="fill" />
          <div style="padding: 14px">
            <span>{{ item.name }}</span>
            <p>简介: {{ item.introduction }}</p>
            <time class="time">创建者：{{ item.founder }}</time>
            <time class="time">删除时间：{{ item.deletedTime }}</time>
            <div class="bottom">
              <el-button type="primary" @click="recoverProject(item.id)"
                >恢复项目</el-button
              >
              <el-button type="danger" @click="finalDeleted(item.id)"
                >彻底删除项目</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Project } from "../../api/project.js";
import { useRouter } from "vue-router";

const router = useRouter();
let recycleList = ref([]);
let teamId = ref();

function recoverProject(id) {
  let data = new FormData();
  data.append("projectId", id);

  Project.recoverProject(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        ElMessage.success("恢复项目成功");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("恢复项目失败");
    });
}

function finalDeleted(id) {
  let data = new FormData();
  data.append("projectId", id);
  Project.finalDeleted(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        ElMessage.success("彻底删除项目成功");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("彻底删除项目失败");
    });
}

function getRecycleList() {
  teamId.value = router.currentRoute.value.query.teamId;
  let data = new FormData();
  data.append("teamId", teamId.value);
  Project.getRecycleList(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        recycleList.value = res.data.projectList;
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("获取回收站列表失败");
    });
}

onMounted(() => {
  getRecycleList();
});
</script>

<style scoped>
.main {
  margin-left: 15%;
  margin-top: 5%;
}
</style>
