<template>
  <div class="header">
    <el-row>
      <el-col :span="6">
        <el-image
          src="https://element-plus.gitee.io/images/element-plus-logo.svg"
          fit="contain"
          style="height: 5vh"
        >
        </el-image>
      </el-col>
      <el-col :span="12"> </el-col>
      <el-col :span="3">
      <el-switch v-model="isDark" />
      </el-col>
      <el-col :span="3">
        <el-dropdown>
          <el-avatar
            :size="50"
            src="https://s1.328888.xyz/2022/08/01/FSOsm.jpg"
          ></el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item>Action 4</el-dropdown-item>
              <el-dropdown-item divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useDark } from '@vueuse/core'
const isDark = useDark()
</script>

<style scoped>
.header {
  height: 5vh;
}
</style>>
