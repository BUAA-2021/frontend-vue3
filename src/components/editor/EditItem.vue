<template>
  <div id="vditor" style="margin: 0 auto"></div>
</template>

<script setup>
import Vditor from "vditor";
import "vditor/dist/index.css";
import defaultValue from "@/config/editor.js";
import { useStorage } from "@vueuse/core";
const vditor = ref();
onMounted(() => {
  vditor.value = new Vditor("vditor", {
    width: "60%",
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
    after: () => {
      const editorValue = useStorage("vditorvditor");
      if (!editorValue.value.trim()) {
        editorValue.value = defaultValue; 
      }
      vditor.value.setValue(editorValue.value);
    },
    input: (md) => {
      console.log("EEE=INPUT", md);
    },
  });
});
</script>

<style>
</style>