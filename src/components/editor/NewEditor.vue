<template>
  <el-container class="wrap">
    <el-main>
      <el-row>
        <div class="title">
          <h2>在线文档 : {{ route.query.name }}</h2>
        </div>
      </el-row>
      <el-row>
        <div
          style="
            width: 70%;
            margin: 0 auto;
            background: white;
            margin-top: 1.5vh;
          "
          class="editor1"
        >
          <div class="editor" v-if="editor">
            <menu-bar class="editor__header" :editor="editor" />
            <editor-content class="editor__content" :editor="editor" />
            <div class="editor__footer">
              <div :class="`editor__status editor__status--${status}`">
                <template v-if="status === 'connected'">
                  {{ editor.storage.collaborationCursor.users.length }}
                  位用户在编辑{{ room }}
                </template>
                <template v-else> 离线 </template>
              </div>
            </div>
          </div>
        </div>
      </el-row>
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
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";
import * as Y from "yjs";
import { useStateStore } from "@/stores/state.js";
import { useRoute } from "vue-router";
import MenuBar from "./MenuBar.vue";
const state = useStateStore();
const route = useRoute();
const getRandomElement = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};
const currentUser = state.userRealname || state.userNickname;
const provider = ref(null);
const editor = ref(null);
const status = ref("connecting");
const room = ref(route.query.name || route.params.id);

onMounted(() => {
  const ydoc = new Y.Doc();
  provider.value = new HocuspocusProvider({
    url: "ws://101.42.173.97:1234",
    // parameters: {
    //   key: 'write_bqgvQ3Zwl34V4Nxt43zR',
    // },
    name: room.value,
    document: ydoc,
  });

  provider.value.on("status", (event) => {
    status.value = event.status;
  });

  editor.value = new Editor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Highlight,
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
// function updateCurrentUser(attributes) {
//   currentUser.value = { ...currentUser.value, ...attributes };
//   editor.value.chain().focus().updateUser(currentUser.value).run();
//    localStorage.setItem("currentUser", JSON.stringify(currentUser.value));
// }
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

<style scoped>
.wrap {
  background-color: #7b91cb;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  backdrop-filter: blur(20px);
  transition: 0.3s;
}

.title {
  margin-left: 16%;
  color: #f8fefc;
}
</style>
