<template>
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
          <el-menu-item index="/" class="box">
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
          <el-menu-item index="/" class="box">
            <el-icon><document /></el-icon>
            <span class="menullist">项目管理</span>
          </el-menu-item>
          <el-menu-item index="/project/myProject" class="subbox">
            <span class="menullist">我的项目</span>
          </el-menu-item>
        </div>
        <div class="submenu1">
          <el-menu-item index="/" class="box">
            <el-icon><setting /></el-icon>
            <span class="menullist">用户资源</span>
          </el-menu-item>
          <el-menu-item index="/" class="subbox">
            <span class="menullist">原型设计</span>
          </el-menu-item>
          <el-menu-item index="/" class="subbox">
            <span class="menullist">UML绘制</span>
          </el-menu-item>
          <el-menu-item index="/" class="subbox">
            <span class="menullist">在线文档</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const activeIndex = ref("1");
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
