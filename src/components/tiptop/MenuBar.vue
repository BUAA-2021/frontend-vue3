<template>
  <div class="itembar">
    <template v-for="(item, index) in items">
      <div
        class="divider"
        v-if="item.type === 'divider'"
        :key="`divider${index}`"
      />
      <menu-item v-else :key="index" v-bind="item" class="edititem" />
    </template>
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";

export default {
  components: {
    MenuItem,
  },

  props: {
    editor: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      items: [
        {
          icon: "bold",
          title: "粗体",
          action: () => this.editor.chain().focus().toggleBold().run(),
          isActive: () => this.editor.isActive("bold"),
        },
        {
          icon: "italic",
          title: "斜体",
          action: () => this.editor.chain().focus().toggleItalic().run(),
          isActive: () => this.editor.isActive("italic"),
        },
        {
          icon: "strikethrough",
          title: "删除线",
          action: () => this.editor.chain().focus().toggleStrike().run(),
          isActive: () => this.editor.isActive("strike"),
        },
        {
          icon: "code-view",
          title: "代码段",
          action: () => this.editor.chain().focus().toggleCode().run(),
          isActive: () => this.editor.isActive("code"),
        },
        {
          icon: "mark-pen-line",
          title: "高亮",
          action: () => this.editor.chain().focus().toggleHighlight().run(),
          isActive: () => this.editor.isActive("highlight"),
        },
        {
          icon: "h-1",
          title: "一级标题",
          action: () =>
            this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 2 }),
        },
        {
          icon: "h-2",
          title: "二级标题",
          action: () =>
            this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 1 }),
        },
        {
          icon: "paragraph",
          title: "段落",
          action: () => this.editor.chain().focus().setParagraph().run(),
          isActive: () => this.editor.isActive("paragraph"),
        },
        {
          icon: "list-unordered",
          title: "无序列表",
          action: () => this.editor.chain().focus().toggleBulletList().run(),
          isActive: () => this.editor.isActive("bulletList"),
        },
        {
          icon: "list-ordered",
          title: "有序列表",
          action: () => this.editor.chain().focus().toggleOrderedList().run(),
          isActive: () => this.editor.isActive("orderedList"),
        },
        {
          icon: "list-check-2",
          title: "任务列表",
          action: () => this.editor.chain().focus().toggleTaskList().run(),
          isActive: () => this.editor.isActive("taskList"),
        },
        {
          icon: "code-box-line",
          title: "代码块",
          action: () => this.editor.chain().focus().toggleCodeBlock().run(),
          isActive: () => this.editor.isActive("codeBlock"),
        },
        {
          icon: "double-quotes-l",
          title: "块引用",
          action: () => this.editor.chain().focus().toggleBlockquote().run(),
          isActive: () => this.editor.isActive("blockquote"),
        },
        {
          icon: "separator",
          title: "分割线",
          action: () => this.editor.chain().focus().setHorizontalRule().run(),
        },
        {
          icon: "text-wrap",
          title: "分段",
          action: () => this.editor.chain().focus().setHardBreak().run(),
        },
        {
          icon: "format-clear",
          title: "清除格式",
          action: () =>
            this.editor.chain().focus().clearNodes().unsetAllMarks().run(),
        },
        {
          type: "divider",
        },
        {
          icon: "arrow-go-back-line",
          title: "撤销",
          action: () => this.editor.chain().focus().undo().run(),
        },
        {
          icon: "arrow-go-forward-line",
          title: "重做",
          action: () => this.editor.chain().focus().redo().run(),
        },
        {
          icon:"table-line",
          title: "添加表格",
          action: () => this.editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        },
        {
          icon:"layout-row-fill",
          title:"添加行",
          action: () => this.editor.chain().focus().addRowAfter().run(),
        },
        {
          icon:"layout-column-fill",
          title:"添加列",
          action: () => this.editor.chain().focus().addColumnAfter().run(),
        },
        {
          icon: "eraser-line",
          title: "按行删除",
          action: () => this.editor.chain().focus().deleteRow().run(),
        },
        {
          icon: "eraser-fill",
          title: "按列删除",
          action: () => this.editor.chain().focus().deleteColumn().run(),
        },
      ],
    };
  },
};
</script>

<style>
.divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(#000, 0.1);
  margin-left: 4rem;
  margin-right: 0.75rem;
}

.itembar {
  margin-left: 1.5rem;
  margin-top: 0.5rem;
  display: flex;
}

.edititem {
  margin-top: 0.5rem;
}
</style>
