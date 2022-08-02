import keyboardJS from 'keyboardjs'
import {
  EVENT_APPLICATION_CLEAR,
  EVENT_APPLICATION_REDO,
  EVENT_APPLICATION_UNDO,
  EVENT_COMPONENT_DELETE,
  EVENT_COMPONENT_DUPLICATE,
} from '../event-enums'
const keyboardActions = [
  { action: EVENT_COMPONENT_DELETE, keys: 'backspace' },
  { action: EVENT_APPLICATION_UNDO, keys: 'ctrl + z' },
  { action: EVENT_APPLICATION_REDO, keys: 'ctrl + shift > z' },
  { action: EVENT_APPLICATION_CLEAR, keys: 'ctrl + k' },
  { action: EVENT_COMPONENT_DUPLICATE, keys: 'ctrl + d' },
]

export const registerKeyboardAction = (application) => {
  keyboardActions.forEach((item) => {
    keyboardJS.bind(item.keys, (e) => {
      // 忽略输入框
      if (!['input', 'textarea'].includes(e.target.tagName.toLowerCase())) {
        e.preventDefault()
        // application.eventbus.$emit(item.action)
        if(item.action==EVENT_COMPONENT_DELETE){
          console.log('DELETE',application.deleteComponent)
          application.deleteComponent();
        }
        if(item.action==EVENT_COMPONENT_DUPLICATE){
          console.log("DUPLICATE");
          application.duplicateComponent();
        }
        if(item.action==EVENT_APPLICATION_UNDO){
          console.log("UNDO");
          application.handleUndo();
        }
        if(item.action==EVENT_APPLICATION_REDO){
          console.log("REDO");
          application.handleRedo();
        }
        if(item.action==EVENT_APPLICATION_CLEAR){
          console.log("CLEAR");
          application.handleClear();
        }
      }
    })
  })
}
