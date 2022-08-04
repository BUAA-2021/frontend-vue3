<script lang="jsx">
import {
  EVENT_APPLICATION_CLEAR,
  EVENT_APPLICATION_REDO,
  EVENT_APPLICATION_UNDO,
  EVENT_COMPONENT_DELETE,
  EVENT_COMPONENT_DUPLICATE,
  EVENT_APPLICATION_EXPORT,
  EVENT_APPLICATION_SAVE,
} from "./event-enums";
export default {
  inject: {
    Undo: {
      from: "application:undo",
    },
    Redo: {
      from: "application:redo",
    },
    Delete: {
      from: "application:delete",
    },
    Duplicate: {
      from: "application:duplicate",
    },
    Clear: {
      from: "application:clear",
    },
    Export: {
      from: "application:export",
    },
    Save: {
      from: "application:save",
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
            title="Save all components in the editing area"
            data-action="save"
            onClick={() => this.Save()}
          >
            保存
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
    );
  },
};
</script>

<style lang="less">
.vs-header {
  height: 50px;
  border-bottom: 1px solid #ececec;
  display: flex;
  align-items: center;
  background: #f8fefc;
  backdrop-filter: blur(20px);
  transition: 0.3s;
  opacity: 0.9;
  h1 {
    text-align: center;
    font-size: 20px;
    color: #333;
    font-weight: 600;
    width: 200px;
  }
  .header-actions {
    display: flex;
    width: 80%;
    align-items: center;
  }
  button {
    padding: 5px 12px;
    font-size: 16px;
    color: #468bcd;
    background: #eee;
    background-image: linear-gradient(to bottom, #fcfcfc 0, #eee 100%);
    border: 3px solid #468bcd;
    background: none;
    margin-right: 20px;
    border-radius: 4px;
    &:hover {
      cursor: pointer;
      transition: all 300ms;
      background: #468bcd;
      color: #f2f2f2;
    }
  }
}
</style>
