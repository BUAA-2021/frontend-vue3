<template>
  <div class="main">
    <el-row>
      <el-col :span="3">
        <div class="demo-image">
          <el-image
            style="width: 100px; height: 100px; border-radius: 50%"
            :src="url"
            :fit="fit"
          />
        </div>
      </el-col>
      <el-col :span="6">
        <h1>{{ name }}</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <p>管理团队：</p>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" style="margin-top: 10px">邀请用户</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="userList" style="width: 100%">
        <el-table-column prop="nName" label="用户昵称" width="180" />
        <el-table-column prop="rName" label="真实姓名" width="180" />
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column
          :sortable="true"
          :sort-method="sortByPower"
          label="身份"
          width="120"
        >
          <template #default="scope">
            <p>{{ identifier[scope.row.type] }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" v-if="userType != 2">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >设置为管理员</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >移除成员</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { onMounted } from "vue";
import { Team } from "../../api/team.js";
import { useRouter } from "vue-router";
import { User } from "../../api/user.js";
import { useStateStore } from "../../stores/state.js";

const stateStore = useStateStore();
let userType = ref(0);

let fit = "fill";
let url = ref(
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
);
let name = ref("猫猫派对");
let userList = ref([]);

let teamId = ref(1);
let inviteUser = ref();
let totUserList = ref([]);
const identifier = ["队长", "管理员", "普通用户"];
const baseUrl = "http://101.42.173.97:8000";

function sortByPower(a, b) {
  console.log(1111);
  if (a.type < b.type) {
    return -1;
  }
}

function deleteTeam() {
  let data = new FormData();
  data.append("teamId", teamId.value);

  Team.deleteTeam(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        ElMessage.success("团队解散成功");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("团队解散失败");
    });
}

function addAdmin(index, row) {
  let data = new FormData();
  data.append("teamId", teamId.value);
  data.append("userId", row.id);

  Team.addAdmin(data)
    .then((res) => {
      if (res.status == 200) {
        userList.value[index].type = 1;
        ElMessage.success("设置成功");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("设置失败");
    });
}

onMounted(() => {
  let router = useRouter();
  teamId.value = parseInt(router.currentRoute.value.query.id);
  let data = new FormData();
  data.append("id", teamId.value);
  console.log(data);
  Team.getTeamInfo(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        console.log(res.data);
        userList.value = res.data.data;
        name.value = res.data.name;
        url.value = res.data.url;
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("获取用户列表失败");
    });
});
</script>

<style scoped>
.main {
  margin-left: 15%;
  margin-top: 5%;
}
</style>

<style scoped>
.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
