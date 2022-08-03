<template>
  <Loading v-show="!wsState" />
  <div v-show="wsState" id="vditor" style="margin: 0 auto"></div>
</template>

<script setup>
import Vditor from "vditor";
import "vditor/dist/index.css";
import defaultValue from "@/config/editor.js";
import { useStorage } from "@vueuse/core";
import { diff_match_patch } from "diff-match-patch";
const vditor = ref();
const dmp = new diff_match_patch();
const wsurl = "ws://101.42.173.97:8000/ws/";
const websocket = ref();
// 初始化vditor
const initVditor = () => {
  vditor.value = new Vditor("vditor", {
    width: "70%",
    preview: {
      hljs: {
        lineNumber: true,
      },
    },
    toolbarConfig: {
      pin: true,
    },
    outline: {
      enable: true,
    },
    fullscreen: {
      index: 3000,
    },
    comment:{
      enable: true,
    },
    upload:{
      url:"/api/upload",
    },
    after: () => {
      const editorValue = useStorage("vditorvditor");
      if (!editorValue?.value.trim()) {
        editorValue.value = defaultValue;
      }
      vditor.value.setValue(editorValue.value); 
    },
    enter: (md) => {
      /* // 比较A和B的差别，并返回diff数组
      let patchList = dmp.patch_make(defaultValue, md);
      //   把diff数组转码成一种神秘格式
      let patchText = dmp.patch_toText(patchList);
      //   把神秘格式转回正常数组
      let patches = dmp.patch_fromText(patchText);
      //   应用diff数组到比较的值
      let results = dmp.patch_apply(patches, defaultValue); */
      console.log("md", md);
      websocket.value.send(md);
    },
  });
};
const initWebSocket = () => {
  //初始化weosocket
  websocket.value = new WebSocket(wsurl);
  websocket.value.onopen = websocketonopen;
  websocket.value.onclose = websocketclose;
  websocket.value.onerror = websocketonerror;
  websocket.value.onmessage = websocketMessage;
};
const wsState = ref(false);
const websocketonopen = (e) => {
  console.log("WebSocket连接成功", e);
  wsState.value = true;
  initVditor();
};
//错误
const websocketonerror = (e) => {
  console.log("WebSocket连接发生错误", e);
  wsState.value = false;
};
//关闭
const websocketclose = (e) => {
  console.log("WebSocket连接关闭", e);
  wsState.value = false;
};
// 接收消息
const websocketMessage = (msg) => {
  console.log("接收到消息", msg.data);
  const editorValue = useStorage("vditorvditor");
  console.log("editorValue", editorValue.value);
  let patchList = dmp.patch_make(editorValue.value, msg.data);
  let patchText = dmp.patch_toText(patchList);
  let patches = dmp.patch_fromText(patchText);
  let results = dmp.patch_apply(patches, editorValue.value);
  console.log("patches", patches);
  console.log("results", results);
  vditor.value.setValue(results[0]);
  vditor.value.blur();
};
onMounted(() => {
  initWebSocket();
});
</script>

<style></style>
