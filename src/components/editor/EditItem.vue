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
import { useRoute } from "vue-router";
const route = useRoute();
const vditor = ref();
const dmp = new diff_match_patch();
const wsurl = "ws://101.42.173.97:8000/ws/";
let ws = null;
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
      console.log("vditor init", vditor.value.value);
      vditor.value.setValue(defaultValue);
    },
    ctrlEnter: (md) => {
      /* // 比较A和B的差别，并返回diff数组
      let patchList = dmp.patch_make(defaultValue, md);
      //   把diff数组转码成一种神秘格式
      let patchText = dmp.patch_toText(patchList);
      //   把神秘格式转回正常数组
      let patches = dmp.patch_fromText(patchText);
      //   应用diff数组到比较的值
      let results = dmp.patch_apply(patches, defaultValue); */
      console.log("MD",md);
      ws.send('{'+'"word_content":'+'"'+String(md)+'"'+','+'"word_id":'+route.params.id+'}');
    },
  });
};

const wsState = ref(false);

const initWebSocket = () => {
  //初始化weosocket
  ws = new WebSocket(wsurl);
  ws.onclose = (e) => {
  ws.send('{'+'"is_close":'+1+','+'"word_id":'+route.params.id+'}')
  we.close();
  console.log("WebSocket连接关闭", e);
  wsState.value = false;
};
  ws.onerror = (e) => {
  console.log("WebSocket连接发生错误", e);
  wsState.value = false;
};
  // message
  ws.onmessage = (msg) => {
  console.log("接收到消息", msg.data);
  // let patchList = dmp.patch_make(editorValue.value, msg.data);
  // let patchText = dmp.patch_toText(patchList);
  // let patches = dmp.patch_fromText(patchText);
  // let results = dmp.patch_apply(patches, editorValue.value);
  // console.log("patches", patches);
  // console.log("results", results);
  vditor.value.setValue(msg.data);
  vditor.value.blur();
  };
  // open
  ws.onopen = (e) => {
  console.log("WebSocket连接成功", e);
  ws.send('{"word_id":'+route.params.id+'}')
  initVditor();
  wsState.value = true;
};
};
onMounted(() => {
  initWebSocket();
});
</script>

<style></style>
