<template>
  <div class="vs-components">
    <template 
    v-for="(item, index) in components"
    :key="index"
    >
    <div @dragstart="(e) => this.handleDrag(e, item)" draggable="true" class="components-item">
    <img class="components-icon" :src="getImageUrl(item)" />
    {{item.name}}
    </div>
    </template>
  </div>
</template>
<script>
import Logo from "@/assets/logo.png";
export default {
  data() {
    return {
      components: [
        {
          type: "label",
          value: "Hi~我是一段文本",
          name: "文本框",
          width: 150,
          height: 30,
        },
        {
          type: "input",
          value: "输入",
          inputType: "input",
          name: "输入框",
          width: 150,
          height: 30,
        },
        {
          type: "select",
          options: [],
          name: "复选框",
          width: 150,
          height: 30,
        },
        {
          type: "img",
          name: "图片",
          url: Logo,
          width: 100,
          height: 100,
        },
        {
          type: "input",
          inputType: "checkbox",
          name: "多选框",
          label: "多选",
          width: 100,
          height: 30,
        },
        {
          type: "input",
          inputType: "radio",
          name: "单选框",
          label: "单选",
          width: 100,
          height: 30,
        },
        {
          type: "input",
          inputType: "button",
          name: "按钮",
          value: "Button",
          width: 100,
          height: 30,
        },
        {
          type: "input",
          inputType: "date",
          name: "日期",
          value: "2021-10-10",
          width: 100,
          height: 30,
        },
        {
          type: "container",
          name: "容器",
          width: 200,
          height: 200,
          children: [],
        },
      ],
    };
  },
  methods: {
    handleDrag(e, item) {
      e.dataTransfer.dropEffect = "copy";
      e.dataTransfer.setData("text/component", JSON.stringify(item));
    },
    getImageUrl(item) {
      return new URL(`/${item.inputType || item.type}.png`, import.meta.url)
        .href;
    },
  },
};
</script>

<style lang="less" scoped>
.vs-components {
  width: 200px;
  border-right: 1px solid #ececec;
  position: relative;
  overflow-y: scroll;
  background: #f8f8f8;
  &::-webkit-scrollbar {
    display: none;
  }
  .components-icon {
    width: 35px;
    height: 35px;
    margin-bottom: 6px;
  }
}
.components-item {
  height: 100px;
  width: 50%;
  float: left;
  display: flex;
  &:nth-child(2n + 1) {
    border-right: 1px solid #ececec;
  }
  border-bottom: 1px solid #ececec;
  align-items: center;
  justify-content: center;
  cursor: move;
  flex-direction: column;
  font-weight: 300;
  &:hover {
    background: #f5f5f5;
  }
}
</style>
