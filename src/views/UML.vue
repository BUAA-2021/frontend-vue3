<template>
  <div class="main">
    <el-button
      type="primary"
      plain
      @click="toManage"
      class="btn"
      style="position: absolute; top: 22px; right: 170px"
      >返回上一级</el-button
    >
    <iframe :src="iframeSrc" frameborder="0"></iframe>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Project } from "../api/project";
const router = useRouter();
const route = useRoute();
console.log("READ?", route.query.readOnly);
const fileId = route.query.id;
const readOnly = route.query.readOnly;
const iframeSrc = ref(
  route.query.readOnly
    ? `http://101.42.173.97:8080/draww/`
    : `http://101.42.173.97:8080/draw_io/`
);
iframeSrc.value += `?id=${route.query.id}&title=${route.query.name}`;
iframeSrc.value +=
  route.query.content ||
  "#RdZHBDoMgDIafhrvC4vTs3Lzs5GFnIp2QoDXIotvTTwPOEbekh/brX34ohOXtdDG8l1cUoAmNxETYiVAaHyglS0Ti6UiSpQ40Rgkv2kClXuBh5OlDCRgCoUXUVvUhrLHroLYB48bgGMruqEPXnjewA1XN9Z7elLDS0ZQeN16CauTqHCeZ67R8FfuXDJILHL8QKwjLDaJ1WTvloJflrXtxc+c/3c/FDHT2x8CcbGfPRfBDrHgD";

function toManage() {
  router.push({
    path: `/project/${route.query.projectID}/detail`,
    query:{
      id : route.query.projectID,
      teamID : route.query.teamID,
    }
  });
}
function unlockUML() {
  if (readOnly) return;
  const data = new FormData();
  console.log("先前query", fileId);
  data.append("fileId", fileId);
  Project.unlockUML(data)
    .then((res) => {
      console.log(res);
      ElMessage.success("您已成功退出编辑");
    })
    .catch((err) => {
      console.log(err);
    });
}
onMounted(() => {
  window.onbeforeunload = unlockUML;
});
onUnmounted(() => {
  unlockUML();
});
</script>

<style scoped>
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
  width: 100%;
  height: 100%;
}

iframe {
  width: 100%;
  height: 100%;
}

.btn {
  padding: 12px 50px;
  color: #063273;
  border: 2px solid #cfe1f7;
  background: #cfe1f7;
  text-align: center;
  height: 35px;
  border-radius: 20px;

  transition: 0.3s linear;
  width: 9%;
  font-weight: 550;
}

.btn:hover {
  background: #063273;
  color: #f2f2f2;
}
</style>
