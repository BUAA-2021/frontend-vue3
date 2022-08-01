<template>
  <div id="vditor" style="margin: 0 auto"></div>
</template>

<script setup>
import Vditor from "vditor";
import "vditor/dist/index.css";
import defaultValue from "@/config/editor.js";
import { useStorage } from "@vueuse/core";
import { diff_match_patch } from "diff-match-patch";
const vditor = ref();
const dmp = new diff_match_patch();
onMounted(() => {
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
      index: 114514,
    },
    after: () => {
      const editorValue = useStorage("vditorvditor");
      if (!editorValue.value.trim()) {
        editorValue.value = defaultValue;
      }
      vditor.value.setValue(editorValue.value);
    },
    input: (md) => {
      // 比较A和B的差别，并返回diff数组
      let patchList = dmp.patch_make(defaultValue, md);
      //   把diff数组转码成一种神秘格式
      let patchText = dmp.patch_toText(patchList);
      //   把神秘格式转回正常数组
      let patches = dmp.patch_fromText(patchText);
      //   应用diff数组到比较的值
      let results = dmp.patch_apply(patches, defaultValue);
      vditor.value.setValue(results[0]);
      console.log("patchList", patchList);
      console.log("patchText", patchText);
      console.log("patches", patches);
      console.log("results", results);
    },
  });
});
</script>

<style>
</style>