<template>
  <div
    class="context-menu"
    v-show="contextMenu.displayContextMenu"
    :style="{
      left: contextMenu.clientX + 'px',
      top: contextMenu.clientY + 'px',
    }"
  >
    <ul>
      <li
        v-for="(item, i) in contextMenu.menuContent"
        :key="i"
        :class="item.disabled ? 'disabled' : ''"
        @click="emitEvent(item.method)"
      >
        {{ item.name }}
        /li>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import bus from "@/views/common/bus";
export default {
  name: "ContextMenu",
  data() {
    return {};
  },
  computed: {
    ...mapState(["contextMenu"]),
  },
  methods: {
    emitEvent(type) {
      bus.$emit("operateDirectory", type);
    },
  },
};
</script>

<style scoped>
.context-menu {
  position: absolute;
  background: #fff;
  color: #34495e;
  min-width: 100px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  cursor: pointer;
  z-index: 1002;
  /* & > ul {
    text-align: left;
    padding: 5px 10px;
    & > li {
      padding: 3px 4px;
      font-size: 12px;
      list-style: none;
      height: 24px;
      line-height: 24px;
      &:hover {
        background: #edf6ff;
      }
    }
    .disabled {
      color: #888585;
      pointer-events: none;
    }
  } */
}
</style>
