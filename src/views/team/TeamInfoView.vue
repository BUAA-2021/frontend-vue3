<template>
  <div class="main">
    <el-row>
      <el-col :span="24">
        <div class="demo-image">
          <el-image
            style="width: 100px; height: 100px"
            :src="require('../../assets/head sculpture.jpg')"
            :fit="fit"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
const fit = "fill";
const url = "";
</script>

<style scoped>
.main {
  margin-left: 15%;
  margin-top: 5%;
}
</style>

<style scoped>
.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
