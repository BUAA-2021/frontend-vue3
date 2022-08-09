<template>
  <el-container class="wrap">
    <el-main>
      <div class="title">
        <span>在线文档 : {{ route.query.name }} | </span>
        <previous class="prepre"></previous>
        <el-dropdown class="drop">
          <el-button type="primary" plain class="btn">导出</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="fileExport(1)"
                >导出word</el-dropdown-item>
              <el-dropdown-item @click="fileExport(2)"
                >导出pdf</el-dropdown-item>
              <el-dropdown-item @click="fileExport(3)"
                >导出markdown</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div
        style="width: 80%; margin: 0 auto; background: white; margin-top: 1.5vh"
      >
        <div class="editor" v-if="editor">
          <menu-bar class="editor__header" :editor="editor" />
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
                  {{ user.name }}
                  <template
                    v-if="
                      index <
                      editor.storage.collaborationCursor.users.length - 1
                    "
                    >、</template
                  >
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
    </el-main>
  </el-container>
</template>

<script setup>
import { HocuspocusProvider } from "@hocuspocus/provider";
import CharacterCount from "@tiptap/extension-character-count";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Paragraph from '@tiptap/extension-paragraph';
import Image from '@tiptap/extension-image';
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";
import * as Y from "yjs";
import { useStateStore } from "@/stores/state.js";
import { useRoute } from "vue-router";
import MenuBar from "./MenuBar.vue";
import { File } from "../../api/file";
import html2md from "html-to-md";
import { saveMD } from "@/utils/saveMD";
import { html2pdf } from "@/utils/html2png";
import {template} from './template.js';
const state = useStateStore();
const route = useRoute();
console.log(route.query.first==true);
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
});
const provider = ref(null);
const editor = ref(null);
const status = ref("connecting");
const room = ref(route.query.name || route.params.id);
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
      Paragraph,
      Image,
      TaskList,
      TaskItem,
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
  background-color: #7b91cb;
  width: 100%;
  height: calc(92% - 2px);
  opacity: 0.8;
  backdrop-filter: blur(20px);
  transition: 0.3s;
}

.title {
  margin-left: 12%;
  font-size: 30px;
  font-weight: bold;
  color: white;
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
  margin-left: 45%;
}

.btn:hover {
  background: #063273;
  color: #f2f2f2;
}

ol {
  type: 1;
}
</style>
