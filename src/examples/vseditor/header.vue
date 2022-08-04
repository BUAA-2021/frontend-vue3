<script lang="jsx">
import {
  EVENT_APPLICATION_CLEAR,
  EVENT_APPLICATION_REDO,
  EVENT_APPLICATION_UNDO,
  EVENT_COMPONENT_DELETE,
  EVENT_COMPONENT_DUPLICATE,
  EVENT_APPLICATION_EXPORT,
  
} from './event-enums'
export default {
  inject:{
    Undo:{
      from:"application:undo",
    },
    Redo:{
      from:"application:redo",
    },
    Delete:{
      from:"application:delete",
    },
    Duplicate:{
      from:"application:duplicate",
    },
    Clear:{
      from:"application:clear",
    },
    Export:{
      from:"application:export",
    },
    },
  render() {
    return (
      <div class="vs-header">
        <h1>喵喵派对</h1>
        <div class="header-actions">
          <button
            title="Return to the previous state"
            data-action="undo"
            onClick={() => this.Undo()}
          >
            撤销
          </button>
          <button
            title="Return to the next state"
            data-action="redo"
            onClick={() => this.Redo()}
          >
            重做
          </button>
          <button
            title="Duplicate selected component"
            data-action="duplicate"
            onClick={() => this.Duplicate()}
          >
            复选
          </button>
          <button
            title="Delete selected component"
            data-action="delete"
            onClick={() => this.Delete()}
          >
            删除
          </button>
          <button
            title="Clear all components in the editing area"
            data-action="clear"
            onClick={() => this.Clear()}
          >
            清空
          </button>
          <button
            title="Export all components in the editing area"
            data-action="export"
            onClick={() => this.Export()}
          >
            导出
          </button>
        </div>
      </div>
    )
  },
}
</script>

<style lang="less">
.vs-header {
  height: 50px;
  border-bottom: 1px solid #ececec;
  display: flex;
  align-items: center;
  background: #f8f8f8;
  h1 {
    text-align: center;
    font-size: 20px;
    color: #333;
    font-weight: 300;
    width: 200px;
  }
  .header-actions {
    display: flex;
    align-items: center;
  }
  button {
    padding: 5px 12px;
    font-size: 16px;
    color: #555;
    background: #eee;
    background-image: linear-gradient(to bottom, #fcfcfc 0, #eee 100%);
    border: 1px solid #d5d5d5;
    margin-right: 20px;
    border-radius: 4px;
    &:hover {
      background: #ddd;
      cursor: pointer;
      transition: all 300ms;
      background-image: linear-gradient(to bottom, #eee 0, #ddd 100%);
    }
  }
}
</style>
