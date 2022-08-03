<script setup>
import CodeBlock, { CodeBlockComponent } from '@aomao/plugin-codeblock-vue';
import Toolbar, { ToolbarPlugin, ToolbarComponent } from '@aomao/toolbar-vue';
import Bold from '@aomao/plugin-bold';
import Engine from '@aomao/engine';
const editor = ref();
onMounted(()=>{
  const engine = new Engine(
    editor.value,
    {
      plugins: [Bold,CodeBlock],
      cards: [CodeBlockComponent],
    }
  );
  engine.setValue("# QWE");

})
</script>

<template>
<div ref="editor"></div>
</template>