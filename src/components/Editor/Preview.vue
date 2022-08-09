<template>
  <div ref="container" class="bg">
    <div>
      <el-button @click="close">关闭</el-button>
      <template v-if="isScreenshot">
        <el-button @click="htmlToPngImage">导出为PNG图片</el-button>
        <el-button @click="htmlToJpegImage">导出为JPEG图片</el-button>
      </template>
    </div>
    <div class="canvas-container">
      <div
        class="canvas"
        :style="{
          ...getCanvasStyle(canvasStyleData),
          width: changeStyleWithScale(canvasStyleData.width) + 'px',
          height: changeStyleWithScale(canvasStyleData.height) + 'px',
        }"
      >
        <ComponentWrapper
          v-for="(item, index) in copyData"
          :key="index"
          :config="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { $on, $off, $once, $emit } from "../../utils/gogocodeTransfer";
import { getStyle, getCanvasStyle } from "@/utils/style";
import { mapState } from "vuex";
import ComponentWrapper from "./ComponentWrapper.vue";
import { changeStyleWithScale } from "../../utils/translate";
import { toJpeg, toPng } from "html-to-image";
import { deepCopy } from "../../utils/utils";

export default {
  components: { ComponentWrapper },
  props: {
    isScreenshot: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      copyData: [],
    };
  },
  computed: mapState(["componentData", "canvasStyleData"]),
  created() {
    this["copyData"] = deepCopy(this.componentData);
  },
  methods: {
    getStyle,
    getCanvasStyle,
    changeStyleWithScale,

    close() {
      $emit(this, "close");
    },

    htmlToPngImage() {
      toPng(document.getElementsByClassName("canvasName")[0])
        .then((dataUrl) => {
          const a = document.createElement("a");
          a.setAttribute("download", "screenshot");
          a.href = dataUrl;
          a.click();
        })
        .catch((error) => {
          console.error("oops, something went wrong!", error);
        })
        .finally(this.close);
    },
    htmlToJpegImage() {
      toJpeg(document.getElementsByClassName("canvasName")[0])
        .then((dataUrl) => {
          const a = document.createElement("a");
          a.setAttribute("download", "screenshot");
          a.href = dataUrl;
          a.click();
        })
        .catch((error) => {
          console.error("oops, something went wrong!", error);
        })
        .finally(this.close);
    },
  },
  emits: ["close"],
};
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background: rgb(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 20px;
  .canvas-container {
    width: calc(100% - 40px);
    height: calc(100% - 120px);
    overflow: auto;

    .canvas {
      background: #fff;
      position: relative;
      margin: auto;
    }
  }

  .close {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>
