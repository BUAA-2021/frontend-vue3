<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1" class="box">
          <template #title>
            <el-icon><location /></el-icon>
            <span class="menullist">Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2" class="box">
          <el-icon><icon-menu /></el-icon>
          <span class="menullist">Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" class="box">
          <el-icon><document /></el-icon>
          <span class="menullist">Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4" class="box">
          <el-icon><setting /></el-icon>
          <span class="menullist">Navigator Four</span>
        </el-menu-item>
        <el-menu-item index="5" class="box">
          <el-icon><setting /></el-icon>
          <span class="menullist">Navigator Four</span>
        </el-menu-item>
        <el-menu-item index="6" class="box">
          <el-icon><setting /></el-icon>
          <span class="menullist">Navigator Four</span>
        </el-menu-item>
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
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style>
.el-menu-vertical-demo {
  width: 100px;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(17, 24, 39);
  border-radius: 10px;
  transition: 0.3s;
  overflow: hidden;
}
.box {
  display: block;
  height: 15%;
  width: 85%;
  margin: 9px;
  border-radius: 5px;
  position: relative;
  transition: 0.3s;
  color: rgb(160, 160, 175);
}

.box span {
  position: relative;
  top: 0px;
  left: 5px;
  opacity: 0;
  transition: 0.1s;
}
.el-menu-vertical-demo:hover {
  width: 270px;
}

.el-menu-vertical-demo:hover span {
  opacity: 1;
}
</style>
