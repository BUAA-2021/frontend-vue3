<template>
  <!-- 默认sideBar -->
  <template v-if="props.sideBarType == 'default'">
    <el-row>
      <el-col class="shell">
        <el-menu
          router
          @open="handleOpen"
          @close="handleClose"
          class="shell"
          :ellipsis="false"
          menu-trigger="hover"
          :collapse="true"
        >
          <div class="submenu1">
            <el-menu-item index="/team/create" class="box">
              <el-icon><icon-menu /></el-icon>
              <span class="menullist">团队管理 </span>
            </el-menu-item>
            <el-menu-item index="/team/create" class="subbox">
              <span class="menullist">创建团队</span>
            </el-menu-item>
            <el-menu-item index="/team/list" class="subbox">
              <span class="menullist">我的团队</span>
            </el-menu-item>
          </div>
          <div class="submenu1">
            <el-menu-item index="/project/myProject" class="box">
              <el-icon><document /></el-icon>
              <span class="menullist">项目管理</span>
            </el-menu-item>
            <el-menu-item index="/project/myProject" class="subbox">
              <span class="menullist">我的项目</span>
            </el-menu-item>
          </div>
          <div class="submenu1">
            <el-menu-item index="/user/protoList" class="box">
              <el-icon><setting /></el-icon>
              <span class="menullist">用户资源</span>
            </el-menu-item>
            <el-menu-item index="/user/protoList" class="subbox">
              <span class="menullist">原型设计</span>
            </el-menu-item>
            <el-menu-item index="/user/umlList" class="subbox">
              <span class="menullist">UML绘制</span>
            </el-menu-item>
            <el-menu-item index="/user/docList" class="subbox">
              <span class="menullist">在线文档</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-col>
    </el-row>
  </template>
  <!-- 团队sideBar -->
  <template v-else-if="props.sideBarType == 'team'">
    <el-row>
      <el-col class="shell">
        <el-menu
          router
          @open="handleOpen"
          @close="handleClose"
          class="shell"
          :ellipsis="false"
          menu-trigger="hover"
          :collapse="true"
        >
          <div class="submenu1">
            <el-menu-item :index="teamInfo" class="box">
              <el-icon><icon-menu /></el-icon>
              <span class="menullist">团队信息 </span>
            </el-menu-item>
          </div>
          <div class="submenu1">
            <el-menu-item :index="projectManage" class="box">
              <el-icon><setting /></el-icon>
              <span class="menullist">项目管理</span>
            </el-menu-item>
          </div>
          <div class="submenu1">
            <el-menu-item :index="documentCenter" class="box">
              <el-icon><document /></el-icon>
              <span class="menullist">文档中心</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-col>
    </el-row>
  </template>
  <!-- 项目sideBar -->
  <template v-else-if="props.sideBarType == 'project'">
    <el-row>
      <el-col class="shell">
        <el-menu
          router
          @open="handleOpen"
          @close="handleClose"
          class="shell"
          :ellipsis="false"
          menu-trigger="hover"
          :collapse="true"
        >
          <div class="submenu1">
            <el-menu-item class="box">
              <el-icon><icon-menu /></el-icon>
              <span class="menullist"> 项目列表 </span>
            </el-menu-item>
            <template v-for="item in projectList" :key="item.id">
              <el-menu-item :index="item.index" class="subbox">
                <span class="menullist">{{item.project_name}}</span>
              </el-menu-item>
            </template>
          </div>
        </el-menu>
      </el-col>
    </el-row>
  </template>
</template>

<script setup>
import { Menu as IconMenu } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { Project } from "@/api/project.js";
const route = useRoute();
const props = defineProps({
  sideBarType: {
    default: "default",
    type: String,
  },
});
// team对应的路由
let teamInfo = ref(`/team/${route.params.teamID}/teamInfo`);
let projectManage = ref(`/team/${route.params.teamID}/projectManage`);
let documentCenter = ref(`/team/${route.params.teamID}/documentCenter`);

// 获取当前团队项目列表
let projectList = ref([]);
function getProjectList() {
  const data = new FormData();
  data.append("teamId", route.query.teamID);
  Project.getProjectList(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        projectList.value = res.data.data;
        if (res.data.data.length == 0) {
          ElMessage.warning("暂无项目");
        }
        projectList.value.forEach((item)=>{
          item.index = `/project/${item.id}/detail?id=${item.id}&teamID=${route.query.teamID}`;
        })
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("获取项目列表失败");
    });
}

onMounted(()=>{
  if(props.sideBarType == 'project'){
    getProjectList();
  }
})

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style>
el-menu {
  border: 0px solid;
}
.shell {
  width: 80px;
  background-color: #063273;
  opacity: 0.8;
  backdrop-filter: blur(20px);
  transition: 0.3s;
  border: 0px solid;
}
.box {
  display: block;
  height: 15%;
  width: 85%;
  margin: 9px;
  color: white;
  border-radius: 5px;
  position: relative;
  transition: 0.3s;
  border: 0px solid;
}

.box span {
  position: relative;
  color: white;
  opacity: 0;
  transition: 0.1s;
  border: 0px solid;
}

.subbox {
  padding-left: 15%;
  display: block;
  height: 15%;
  width: 85%;
  margin: 9px;
  color: white;
  border-radius: 5px;
  position: relative;
  transition: 0.3s;
  border: 0px solid;
}

.subbox span {
  position: relative;
  color: white;
  opacity: 0;
  font-size: 10px;
  transition: 0.1s;
  border: 0px solid;
}

.shell:hover {
  width: 210px;
}

.shell:hover span {
  opacity: 1;
}

.box:hover span {
  color: #063273;
}
.box:hover {
  color: #063273;
}

.subbox:hover span {
  color: #063273;
}
.subbox:hover {
  color: #063273;
}

.submenu1 .subbox {
  height: 0;
  transition: 0.2s;
  opacity: 0;
}
.submenu1:hover .subbox {
  height: 65px;
  opacity: 1;
  transform: translateX(10);
}
</style>
