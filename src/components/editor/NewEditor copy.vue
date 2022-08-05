<template>
  <div style="width:70%; margin: 0 auto;background = white;">
    <div class="editor" v-if="editor">
      <menu-bar class="editor__header" :editor="editor" />
      <editor-content class="editor__content" :editor="editor" />
      <div class="editor__footer">
        <div :class="`editor__status editor__status--${status}`">
          <template v-if="status === 'connected'">
            {{ editor.storage.collaborationCursor.users.length }} user{{ editor.storage.collaborationCursor.users.length === 1 ? '' : 's' }} online in {{ room }}
          </template>
          <template v-else>
            offline
          </template>
        </div>
        <div class="editor__name">
          <button @click="setName">
            {{ currentUser.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HocuspocusProvider } from '@hocuspocus/provider'
import CharacterCount from '@tiptap/extension-character-count'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import * as Y from 'yjs'

import MenuBar from './MenuBar.vue'

const getRandomElement = list => {
  return list[Math.floor(Math.random() * list.length)]
}


export default {
  components: {
    EditorContent,
    MenuBar,
  },

  data() {
    return {
      currentUser: JSON.parse(localStorage.getItem('currentUser')) || {
        name: LLLeo,
        color: this.getRandomColor(),
      },
      provider: null,
      editor: null,
      status: 'connecting',
      room: this.$route.params.id,
    }
  },

  mounted() {
    const ydoc = new Y.Doc()
    this.provider = new HocuspocusProvider({
      url: 'ws://101.42.173.97:1234',
      // parameters: {
      //   key: 'write_bqgvQ3Zwl34V4Nxt43zR',
      // },
      name: this.room,
      document: ydoc,
    })

    this.provider.on('status', event => {
      this.status = event.status
    })

    this.editor = new Editor({
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
          provider: this.provider,
          user: this.currentUser,
        }),
        CharacterCount.configure({
          limit: 10000,
        }),
      ],
    })

    localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
  },

  methods: {
    updateCurrentUser(attributes) {
      this.currentUser = { ...this.currentUser, ...attributes }
      this.editor.chain().focus().updateUser(this.currentUser).run()
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
    },
    getRandomColor() {
      return getRandomElement([
        '#958DF1',
        '#F98181',
        '#FBBC88',
        '#FAF594',
        '#70CFF8',
        '#94FADB',
        '#B9F18D',
      ])
    },
    getRandomName() {
      return getRandomElement([
        'Lea Thompson', 'Cyndi Lauper', 'Tom Cruise', 'Madonna', 'Jerry Hall', 'Joan Collins', 'Winona Ryder', 'Christina Applegate', 'Alyssa Milano', 'Molly Ringwald', 'Ally Sheedy', 'Debbie Harry', 'Olivia Newton-John', 'Elton John', 'Michael J. Fox', 'Axl Rose', 'Emilio Estevez', 'Ralph Macchio', 'Rob Lowe', 'Jennifer Grey', 'Mickey Rourke', 'John Cusack', 'Matthew Broderick', 'Justine Bateman', 'Lisa Bonet',
      ])
    },
  },

  beforeUnmount() {
    this.editor.destroy()
    this.provider.destroy()
  },
}
</script>