<template>
  <el-container class="wrap">
    <SideBar />
    <el-main>
      <div class="main">
        <iframe :src="iframeSrc" frameborder="0"></iframe>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const iframeSrc = ref(`http://101.42.173.97:8080/drawio/?id=${route.query.id}&title=${route.query.name}`);
iframeSrc.value += route.query.content||'#RdZHBDoMgDIafhrvC4vTs3Lzs5GFnIp2QoDXIotvTTwPOEbekh/brX34ohOXtdDG8l1cUoAmNxETYiVAaHyglS0Ti6UiSpQ40Rgkv2kClXuBh5OlDCRgCoUXUVvUhrLHroLYB48bgGMruqEPXnjewA1XN9Z7elLDS0ZQeN16CauTqHCeZ67R8FfuXDJILHL8QKwjLDaJ1WTvloJflrXtxc+c/3c/FDHT2x8CcbGfPRfBDrHgD'
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
