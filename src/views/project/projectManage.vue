<template>
  <div class="main">
    <el-row>
      <el-col
        v-for="(item, index) in projectList"
        :key="item"
        :span="6"
        :offset="index > 0 ? 1 : 0"
      >
        <el-card
          style="border: 0px"
          shadow="always"
          :body-style="{ padding: '0px' }"
        >
          <el-image :src="item.project_logo" fit="fill" />
          <div style="padding: 14px">
            <span>{{ item.project_name }}</span>
            <p>简介: {{ item.project_production }}</p>
            <time class="time">创建者：{{ item.founder }}</time>
            <div class="bottom">
              <el-button text class="button" @click="toTeamInfo(item.id)"
                >进入项目</el-button
              >
              <el-button text class="button" @click="toTeamInfo(item.id)"
                >删除项目</el-button
              >
              <el-button text class="button" @click="toTeamInfo(item.id)"
                >重命名项目</el-button
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
import { useStateStore } from "../../stores/state.js";

const router = useRouter();
let teamId = ref();
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

function getProjectList() {
  teamId.value = router.currentRoute.value.query.id;
  let data = new FormData();
  data.append("teamId", teamId.value);
  Project.getProjectList(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        projectList.value = res.data.data;
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("获取项目列表失败");
    });
}

onMounted(() => {
  getProjectList();
});
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
<style>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
