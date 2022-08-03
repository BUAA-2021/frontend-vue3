<template>
  <el-row>
    <el-col class="shell">
      <el-menu @open="handleOpen" @close="handleClose" class="shell">
        <!-- <el-sub-menu index="1" class="box">
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
        </el-sub-menu> -->
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
.shell {
  width: 80px;
  background-color: #063273;
  opacity: 0.8;
  backdrop-filter: blur(20px);
  transition: 0.3s;
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
}

.box span {
  position: relative;
  color: white;
  opacity: 0;
  transition: 0.1s;
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
</style>
