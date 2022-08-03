<template>
  <div :class="parentId ? 'ds-editor nest-editor' : 'ds-editor root-editor'">
    <div class="ds-editor-canvas" ref="editor">
      <CellWrapperVue v-for="item in value"
                   :item="item"
                   :key="item.id"
                   />
      <slot name="default"></slot>
      <PluginDropFileVue :parentId="parentId" :length="value.length" />
    </div>
  </div>
</template>
<script>
// src\examples\vseditor\cell-wrapper.vue
// src\examples\vseditor\plugins\plugin-drop.vue
import CellWrapperVue from '@/examples/vseditor/cell-wrapper.vue'
import PluginDropFileVue from '@/examples/vseditor/plugins/plugin-drop.vue'

export default {
  props: {
    value: Array,
    parentId: String,
    parent: Object,
  },
  components:{
    CellWrapperVue,
    PluginDropFileVue,
  },
  methods: {
    getWrapperElement() {
      return this.$refs.editor
    },
  },
}
</script>

<style lang="less">
.ds-editor-canvas {
  width: 100%;
  height: 100%;
  background: white;
}

.root-editor > .ds-editor-canvas {
  transform: scale(1);
  transform-origin: top left;
}
</style>
