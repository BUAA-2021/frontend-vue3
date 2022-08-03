<template>
  <el-container class="wrap">
    <SideBar />
    <el-main class="main0">
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
          <el-col :span="6">
            <el-button
              style="margin-top: 4%"
              plain
              type="success"
              @click="toProjectList()"
              >管理项目</el-button
            >
          </el-col>
        </el-row>
        <el-row v-if="userType != 2">
          <el-col :span="2">
            <p>管理团队：</p>
          </el-col>
          <el-col :span="5">
            <el-select
              v-model="inviteUser"
              filterable
              placeholder="搜索成员昵称"
              style="width: 240px; margin-top: 3%; display: block"
            >
              <el-option
                v-for="item in totUserList"
                :key="item.id"
                :label="item.nName"
                :value="item.id"
              />
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button
              style="margin-top: 4%"
              type="primary"
              @click="inviteMember()"
              >邀请成员</el-button
            >
          </el-col>
          <el-col :span="2">
            <el-button
              v-if="userType == 0"
              style="margin-top: 4%"
              type="danger"
              @click="deleteTeam()"
              >解散团队</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <el-table
            :default-sort="{ prop: 'type', order: 'ascending' }"
            :data="userList"
            style="width: 100%"
          >
            <el-table-column prop="nName" label="用户昵称" width="180" />
            <el-table-column prop="rName" label="真实姓名" width="180" />
            <el-table-column prop="email" label="邮箱" width="180" />
            <el-table-column prop="type" label="身份" width="120">
              <template #default="scope">
                <p>{{ identifier[scope.row.type] }}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" v-if="userType != 2">
              <template #default="scope">
                <el-button
                  v-if="scope.row.type == 2"
                  size="small"
                  type="primary"
                  @click="addAdmin(scope.$index, scope.row)"
                  >设置为管理员</el-button
                >
                <el-button
                  v-if="scope.row.type == 1"
                  size="small"
                  type="danger"
                  @click="deleteAdmin(scope.$index, scope.row)"
                  >移除管理员</el-button
                >
                <el-button
                  v-if="scope.row.type != 0"
                  size="small"
                  type="danger"
                  @click="deleteMember(scope.$index, scope.row)"
                  >移除成员</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { onMounted } from "vue";
import { Team } from "../../api/team.js";
import { useRouter } from "vue-router";
import { User } from "../../api/user.js";
import { useStateStore } from "../../stores/state.js";

const router = useRouter();
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

function toProjectList() {
  router.push({
    path: "/project/manage",
    query: {
      id: teamId.value,
    },
  });
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
  console.log("我要添加管理员");
  console.log(index);
  console.log(row);
  let data = new FormData();
  data.append("teamId", teamId.value);
  data.append("userId", row.id);
  Team.addAdmin(data)
    .then((res) => {
      if (res.status == 200) {
        userList.value[index].type = 1;
        getBasicInfo();
        ElMessage.success("设置成功");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("设置失败");
    });
}

function deleteAdmin(index, row) {
  let data = new FormData();
  data.append("teamId", teamId.value);
  data.append("userId", row.id);

  Team.deleteAdmin(data)
    .then((res) => {
      if (res.status == 200) {
        userList.value[index].type = 2;
        getBasicInfo();
        ElMessage.success("取消管理员成功");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("取消管理员失败");
    });
}

// function addUserInfo(id) {
//   let data = new FormData();
//   data.append("wantId", id);
// User.getUserInfo(data)
//   .then((res) => {
//     if (res.status == 200) {
//       let user = {
//         id: res.data.id,
//         nName: res.data.nickname,
//         rName: res.data.realname,
//         type: 2,
//         email: res.data.email,
//       };
//       userList.value.push(user);
//     }
//   })
//     .catch((error) => {
//       console.log(error);
//       ElMessage.error("获取成员信息失败");
//     });
// }

function inviteMember() {
  let data = new FormData();
  data.append("teamId", teamId.value);
  data.append("userId", inviteUser.value);

  Team.addMember(data)
    .then((res) => {
      if (res.status == 200) {
        getBasicInfo();
        // addUserInfo(inviteUser.value);
        ElMessage.success("添加成员成功");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("添加成员失败");
    });
}

function deleteMember(index, row) {
  let data = new FormData();
  data.append("teamId", teamId.value);
  data.append("userId", row.id);

  Team.deleteMember(data)
    .then((res) => {
      if (res.status == 200) {
        userList.value.splice(index, 1);
        getBasicInfo();
        ElMessage.success("移除成员成功");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("移除成员失败");
    });
}

function getTotUserList() {
  User.getUserList().then((res) => {
    totUserList.value = res.data.data;
  });
}

function getBasicInfo() {
  teamId.value = parseInt(router.currentRoute.value.query.id);
  let data = new FormData();
  data.append("id", teamId.value);
  Team.getTeamInfo(data)
    .then((res) => {
      if (res.status == 200) {
        userList.value = res.data.data;
        name.value = res.data.name;
        url.value = res.data.logo;
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("获取用户列表失败");
    });
}

function getUserType() {
  console.log(stateStore.userId);
  let data = new FormData();
  data.append("teamId", teamId.value);
  Team.getUserType(data)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        userType.value = res.data.userType;
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("获取当前用户信息失败");
    });
}

onMounted(() => {
  getBasicInfo();
  getUserType();
  getTotUserList();
});
</script>

<style scoped>
.wrap {
  background-color: #f8fefc;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  backdrop-filter: blur(20px);
  transition: 0.3s;
}
sideBar {
  z-index: 10;
  position: absolute;
  top: 30px;
  left: 30px;
}
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
<style scoped>
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
