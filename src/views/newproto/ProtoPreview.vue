<template>
  <div class="home">
    <Toolbar :isPreview="isPreview" />
    <!-- {{ componentData }} -->
    <main>
      <!-- 左侧组件列表 -->
      <section class="left">
        <ComponentList />
        <RealTimeComponentList />
      </section>
      <!-- 中间画布 -->
      <section class="center">
        <div
          class="content"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @mousedown="handleMouseDown"
          @mouseup="deselectCurComponent"
        >
          <Editor />
        </div>
      </section>
      <!-- 右侧属性列表 -->
      <section class="right">
        <el-tabs v-if="curComponent" v-model="activeName">
          <el-tab-pane label="属性" name="attr">
            <!-- {{ curComponent }}
            <hr />
            {{ curComponent.component }} -->
            <component :is="curComponent.component + 'Attr'" />
          </el-tab-pane>
          <el-tab-pane label="动画" name="animation" style="padding-top: 20px">
            <AnimationList />
          </el-tab-pane>
          <el-tab-pane label="事件" name="events" style="padding-top: 20px">
            <EventList />
          </el-tab-pane>
        </el-tabs>
        <CanvasAttr v-else></CanvasAttr>
      </section>
    </main>
  </div>
</template>

<script>
import Editor from "../../components/Editor/index.vue";
import ComponentList from "../../components/Editor/ComponentList.vue"; // 左侧列表组件
import AnimationList from "../../components/Editor/AnimationList.vue"; // 右侧动画列表
import EventList from "../../components/Editor/EventList.vue"; // 右侧事件列表
import { useList } from "../../custom-component/component-list"; // 左侧列表数据
import Toolbar from "../../components/Editor/Toolbar.vue";
import { deepCopy } from "../../utils/utils";
import { mapState } from "vuex";
import generateID from "../../utils/generateID";
import { listenGlobalKeyDown } from "../../utils/shortcutKey";
import RealTimeComponentList from "../../components/Editor/RealTimeComponentList.vue";
import CanvasAttr from "../../components/Editor/CanvasAttr.vue";
import { Project } from "../../api/project";
import { File } from "../../api/file";

export default {
  components: {
    Editor,
    ComponentList,
    AnimationList,
    EventList,
    Toolbar,
    RealTimeComponentList,
    CanvasAttr,
  },
  data() {
    return {
      activeName: "attr",
      reSelectAnimateIndex: undefined,
      provider: null,
      doc: null,
      dataArray: null,
      prototypeId: 0,
      code: "",
      isPreview: true,
    };
  },
  computed: mapState([
    "componentData",
    "curComponent",
    "isClickComponent",
    "canvasStyleData",
    "editor",
  ]),
  mounted() {},
  created() {
    this.code = this.$route.params.code;
    let data = new FormData();
    data.append("previewCode", this.code);
    File.previewByCode(data).then((res) => {
      console.log(res);
      if (res.status == 200) {
        const data = new FormData();
        data.append("protoId", res.data.prototypeId);
        Project.getProto(data)
          .then((res) => {
            this.$store.commit(
              "setComponentData",
              JSON.parse(res.data.canvasData).array
            );
            this.$store.commit(
              "setCanvasStyle",
              JSON.parse(res.data.canvasStyle)
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    this.restore();
  },
  methods: {
    restore() {
      const data = new FormData();
      data.append("protoId", this.prototypeId);
      Project.getProto(data)
        .then((res) => {
          this.$store.commit(
            "setComponentData",
            JSON.parse(res.data.canvasData).array
          );
          this.$store.commit(
            "setCanvasStyle",
            JSON.parse(res.data.canvasStyle)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      const index = e.dataTransfer.getData("index");
      const rectInfo = this.editor.getBoundingClientRect();
      if (index) {
        const componentList = useList();
        console.log("componentList", componentList, index);
        const component = deepCopy(componentList[index]);
        component.style.top = e.clientY - rectInfo.y;
        component.style.left = e.clientX - rectInfo.x;
        component.id = generateID();
        this.$store.commit("addComponent", { component });
        this.$store.commit("recordSnapshot");
        this.setDocArray();
      }
    },

    handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },

    handleMouseDown(e) {
      e.stopPropagation();
      this.$store.commit("setClickComponentStatus", false);
      this.$store.commit("setInEditorStatus", true);
    },

    deselectCurComponent(e) {
      if (!this.isClickComponent) {
        this.$store.commit("setCurComponent", { component: null, index: null });
      }

      // 0 左击 1 滚轮 2 右击
      if (e.button != 2) {
        this.$store.commit("hideContextMenu");
      }
    },
  },
};
</script>

<style lang="scss">
.home {
  height: 100vh;
  background: #fff;
  main {
    height: calc(100% - 64px);
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;

      & > div {
        overflow: auto;

        &:first-child {
          border-bottom: 1px solid #ddd;
        }
      }
    }

    .right {
      position: absolute;
      height: 100%;
      width: 288px;
      right: 0;
      top: 0;

      .el-select {
        width: 100%;
      }
    }

    .center {
      margin-left: 200px;
      margin-right: 288px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;

      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }

  .placeholder {
    text-align: center;
    color: #333;
  }

  .global-attr {
    padding: 10px;
  }
}
</style>

<style src="../../styles/reset.css"></style>
<style src="../../styles/global.scss" lang="scss"></style>
<style src="../../styles/animate.scss"></style>
<style scoped>
li {
  list-style: none;
}
</style>
<style src="../../assets/iconfont/iconfont.css"></style>
