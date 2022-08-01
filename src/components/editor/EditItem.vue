<template>
  <div id = "vditor"></div>
</template>

<script setup>
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import defaultValue from '@/config/editor.js';
const vditor = ref();
onMounted(() => {
  vditor.value = new Vditor('vditor', {
    after: () => {
      // vditor.value is a instance of Vditor now and thus can be safely used here
      vditor.value.setValue(defaultValue);
    },
  });
});

</script>

<style>

</style>