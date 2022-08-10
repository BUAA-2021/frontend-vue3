<template>
  <div
    style="top: 50px; left: 80px; position: fixed; z-index: 99; width: 200px"
  >
    <div>
      <div :class="`editor__status editor__status--${status}`">
        <template v-if="status === 'connected'">
          <template
            v-for="(user, index) in editor.storage.collaborationCursor.users"
            :key="index"
          >
            <el-avatar :size="40" :src="user.avatar"></el-avatar>
          </template>
          <template v-if="editor.storage.collaborationCursor.users.length > 1">
            <span style="font-weight: bold; margin-left: 5px">
              等{{
                editor.storage.collaborationCursor.users.length
              }}位用户编辑</span
            >
          </template>
          <template v-else
            ><span style="font-weight: bold; margin-left: 5px">
              在编辑{{ room }}
            </span></template
          >
        </template>
        <template v-else> 离线 </template>
      </div>
    </div>
  </div>
  <DocumentCenter
    fromDoc
    class="center"
    style="top: 120px; left: 0px; position: absolute; z-index: 99"
  />
  <el-main class="wrap">
    <div class="title" style="margin-left: 22%">
      <span>在线文档 : {{ route.query.name }} | </span>
      <previous class="prepre"></previous>
      <el-dropdown class="drop">
        <el-button type="primary" plain class="btn">导出</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="fileExport(1)">导出word</el-dropdown-item>
            <el-dropdown-item @click="fileExport(2)">导出pdf</el-dropdown-item>
            <el-dropdown-item @click="fileExport(3)"
              >导出markdown</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-row>
      <div
        style="
          width: 70%;
          margin: 0 auto;
          background: white;
          margin-top: 1.5vh;
          margin-left: 22%;
        "
      >
        <div class="editor" v-if="editor">
          <menu-bar class="editor__header" :editor="editor" />
          <bubble-menu
            class="bubble-menu"
            :tippy-options="{ duration: 100 }"
            :editor="editor"
          >
            <button
              @click="editor.chain().focus().toggleBold().run()"
              :class="{ 'is-active': editor.isActive('bold') }"
            >
              粗体
            </button>
            <button
              @click="editor.chain().focus().toggleItalic().run()"
              :class="{ 'is-active': editor.isActive('italic') }"
            >
              斜体
            </button>
            <button
              @click="editor.chain().focus().toggleStrike().run()"
              :class="{ 'is-active': editor.isActive('strike') }"
            >
              删除线
            </button>
          </bubble-menu>
          <editor-content
            class="editor__content"
            :editor="editor"
            id="editorContent"
          />
          <div class="editor__footer">
            <div :class="`editor__status editor__status--${status}`">
              <template v-if="status === 'connected'">
                <template
                  v-for="(user, index) in editor.storage.collaborationCursor
                    .users"
                  :key="index"
                >
                  <el-avatar :size="40" :src="user.avatar"></el-avatar>
                </template>
                <template
                  v-if="editor.storage.collaborationCursor.users.length > 1"
                >
                  等共{{
                    editor.storage.collaborationCursor.users.length
                  }}位用户在编辑
                </template>
                <template v-else> 在编辑{{ room }} </template>
              </template>
              <template v-else> 离线 </template>
            </div>
          </div>
        </div>
      </div>
    </el-row>
  </el-main>
</template>

<script setup>
import { HocuspocusProvider } from "@hocuspocus/provider";
import CharacterCount from "@tiptap/extension-character-count";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import { BubbleMenu, Editor, EditorContent } from "@tiptap/vue-3";
import * as Y from "yjs";
import { useStateStore } from "@/stores/state.js";
import { useRoute } from "vue-router";
import MenuBar from "./MenuBar.vue";
import { File } from "../../api/file";
import html2md from "html-to-md";
import { saveMD } from "@/utils/saveMD";
import { html2pdf } from "@/utils/html2png";
import { template } from "./template.js";
import Paragraph from "@tiptap/extension-paragraph";
import Image from "@tiptap/extension-image";
import DocumentCenter from "../../views/team/documentCenter.vue";
const state = useStateStore();
const route = useRoute();
const getRandomElement = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};
function fileExport(type) {
  let html = editor.value.getHTML();
  let md = html2md(html);
  const fromData = new FormData();
  fromData.append("html", html);
  fromData.append("type", type);
  fromData.append("name", route.query.name);
  ElMessage.success("正在导出中...");
  // docx
  if (type == 1) {
    File.exportFile(fromData)
      .then((res) => {
        console.log(res);
        const blob = new Blob([res.data]);
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.download = `${route.query.name}.docx`;
        a.href = blobUrl;
        a.click();
        URL.revokeObjectURL(a.href);
      })
      .catch((err) => {
        console.log(err);
      });
    // pdf
  } else if (type == 2) {
    File.exportFile(fromData)
      .then((res) => {
        console.log(res);
        const blob = new Blob([res.data]);
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.download = `${route.query.name}.pdf`;
        a.href = blobUrl;
        a.click();
        URL.revokeObjectURL(a.href);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // md
  else {
    saveMD(md, route.query.name);
  }
}
const currentUser = ref({
  name:
    localStorage.getItem("userRealname") ||
    localStorage.getItem("userNickname"),
  color: getRandomColor(),
  avatar: localStorage.getItem("userAvatar"),
});
const provider = ref(null);
const editor = ref(null);
const status = ref("connecting");
const room = ref(route.query.name || route.params.id);
const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-background-color"),
        renderHTML: (attributes) => {
          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});
onMounted(() => {
  const ydoc = new Y.Doc();
  provider.value = new HocuspocusProvider({
    url: "ws://101.42.173.97:1234",
    name: room.value,
    document: ydoc,
  });

  provider.value.on("status", (event) => {
    status.value = event.status;
  });
  editor.value = new Editor({
    content: template[Number(route.query.first)],
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Highlight,
      Typography,
      TaskList,
      TaskItem,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      CustomTableCell,
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider: provider.value,
        user: currentUser.value,
      }),
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
  });
});
function getRandomColor() {
  return getRandomElement([
    "#958DF1",
    "#F98181",
    "#FBBC88",
    "#FAF594",
    "#70CFF8",
    "#94FADB",
    "#B9F18D",
  ]);
}
function getRandomName() {
  return getRandomElement([
    "Lea Thompson",
    "Cyndi Lauper",
    "Tom Cruise",
    "Madonna",
    "Jerry Hall",
    "Joan Collins",
    "Winona Ryder",
    "Christina Applegate",
    "Alyssa Milano",
    "Molly Ringwald",
    "Ally Sheedy",
    "Debbie Harry",
    "Olivia Newton-John",
    "Elton John",
    "Michael J. Fox",
    "Axl Rose",
    "Emilio Estevez",
    "Ralph Macchio",
    "Rob Lowe",
    "Jennifer Grey",
    "Mickey Rourke",
    "John Cusack",
    "Matthew Broderick",
    "Justine Bateman",
    "Lisa Bonet",
  ]);
}
onUnmounted(() => {
  editor.value.destroy();
  provider.value.destroy();
});
</script>
<style lang="scss">
.editor {
  display: flex;
  flex-direction: column;
  min-height: 30vh;
  color: #0d0d0d;
  background-color: #fff;
  border: 3px solid #0d0d0d;
  border-radius: 0.75rem;
  &__header {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
    border-bottom: 3px solid #0d0d0d;
  }
  &__content {
    padding: 1.25rem 1rem;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    border: 0px solid #0d0d0d;
    -webkit-overflow-scrolling: touch;
  }

  &__footer {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    white-space: nowrap;
    border-top: 3px solid #0d0d0d;
    font-size: 12px;
    font-weight: 600;
    color: #0d0d0d;
    white-space: nowrap;
    padding: 0.25rem 0.75rem;
  }

  /* Some information about the status */
  &__status {
    display: flex;
    align-items: center;
    border-radius: 5px;

    &::before {
      content: " ";
      flex: 0 0 auto;
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: rgba(#0d0d0d, 0.5);
      border-radius: 50%;
      margin-right: 0.5rem;
    }

    &--connecting::before {
      background: #616161;
    }

    &--connected::before {
      background: #b9f18d;
    }
  }

  &__name {
    button {
      background: none;
      border: none;
      font: inherit;
      font-size: 12px;
      font-weight: 600;
      color: #0d0d0d;
      border-radius: 0.4rem;
      padding: 0.25rem 0.5rem;

      &:hover {
        color: #fff;
        background-color: #0d0d0d;
      }
    }
  }
}
.bubble-menu {
  display: flex;
  background-color: #0d0d0d;
  padding: 0.2rem;
  border-radius: 0.5rem;

  button {
    border: none;
    background: none;
    color: #fff;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}
</style>

<style lang="scss">
/* Give a remote user a caret */
.collaboration-cursor__caret {
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  border-left: 1px solid #0d0d0d;
  border-right: 1px solid #0d0d0d;
  word-break: normal;
  pointer-events: none;
}

/* Render the username above the caret */
.collaboration-cursor__label {
  position: absolute;
  top: -1.4em;
  left: -1px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  user-select: none;
  color: #0d0d0d;
  padding: 0.1rem 0.3rem;
  border-radius: 3px 3px 3px 0;
  white-space: nowrap;
}

/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;
    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }
    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }
    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }
    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }
    p {
      margin: 0;
    }
  }
  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  mark {
    background-color: #faf594;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0.5rem;

    li {
      display: flex;
      align-items: center;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }
}

.ProseMirror {
  border: 2px solid #0d0d0d;
  margin-right: 0.5rem;
}
</style>

<style scoped>
.wrap {
  /* background-color: black; */
  width: 100%;
  min-height: 100%;
  opacity: 0.8;
  backdrop-filter: blur(20px);
  transition: 0.3s;
}

.title {
  margin-left: 12%;
  font-size: 30px;
  font-weight: bold;
  color: black;
  font-weight: black;
}
.drop {
  margin-left: 45%;
  margin-top: 1%;
}
.btn {
  z-index: 999;
  padding: 12px 50px;
  color: #063273;
  border: 2px solid #cfe1f7;
  background: white;
  text-align: center;
  height: 35px;
  font-size: 17px;
  border-radius: 20px;
  transition: 0.3s linear;
  width: 10%;
  font-weight: 550;
  margin-left: 10%;
}

.btn:hover {
  background: #063273;
  color: #f2f2f2;
}

ol {
  type: 1;
}

.center {
  width: 100px;
}
</style>
