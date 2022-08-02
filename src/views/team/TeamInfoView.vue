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
      <el-col :span="5">
        <el-select
          v-model="inviteUser"
          filterable
          placeholder="搜索成员昵称"
          style="width: 240px; margin-top: 3%; display: block"
        >
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.nName"
            :value="item.id"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button style="margin-top: 4%" type="primary" @click="inviteMember()"
          >邀请成员</el-button
        >
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="userList" border style="width: 100%">
        <el-table-column prop="nName" label="用户昵称" width="180" />
        <el-table-column prop="rName" label="真实姓名" width="180" />
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column prop="type" label="身份" width="120" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="addAdmin(scope.$index, scope.row)"
              >设置为管理员</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="deleteAdmin(scope.$index, scope.row)"
              >移除管理员</el-button
            >
            <el-button
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
</template>

<script setup>
import { ElMessage } from "element-plus";
import { onMounted } from "vue";
import { Team } from "../../api/team.js";
import { useRouter } from "vue-router";

let fit = "fill";
let url = ref(
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
);
let name = ref("猫猫派对");
let userList = ref([]);
let teamId = ref(1);
let inviteUser = ref();
const identifier = ["队长", "管理员", "普通用户"];

function addAdmin(index, row) {
  let data = {
    teamId: teamId.value,
    userId: row.id,
  };
  Team.addAdmin(data)
    .then((res) => {
      if (res.status == 200) {
        ElMessage.success("设置成功");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("设置失败");
    });
}

function deleteAdmin(index, row) {
  let data = {
    teamId: teamId.value,
    userId: row.id,
  };
  Team.deleteAdmin(data)
    .then((res) => {
      if (res.status == 200) {
        ElMessage.success("取消管理员成功");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("取消管理员失败");
    });
}

function inviteMember() {
  let data = {
    teamId: teamId.value,
    userId: inviteUser.value,
  };
  Team.addMember(data)
    .then((res) => {
      if (res.status == 200) {
        ElMessage.success("添加成员成功");
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("添加成员失败");
    });
}

onMounted(() => {
  let router = useRouter();
  teamId.value = parseInt(router.currentRoute.value.params.id);
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
