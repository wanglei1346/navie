<template>
  <div class="userList">
    <div class="tree">
      <n-space vertical :size="12">
        <n-input
          v-model:value="state.form.pattern"
          placeholder="请输入关键词"
          style="margin-top: 10px"
        />
        <n-tabs
          type="segment"
          animated
          default-value="1"
          @update:value="updateRole"
        >
          <n-tab-pane name="1" tab="组织架构">
            <n-tree
              block-line
              :data="state.data"
              :filter="filterPattern"
              expand-on-click
              :pattern="state.form.pattern"
              children-field="sysOrgInfoCOS"
              label-field="orgName"
              key-field="orgId"
              @update:selected-keys="updateExpandedKeys"
            />
          </n-tab-pane>
          <n-tab-pane name="2" tab="角色">
            <n-tree
              block-line
              :filter="filterPatternRole"
              :data="state.roleData"
              :pattern="state.form.pattern"
              label-field="roleName"
              key-field="roleId"
              @update:selected-keys="updateExpandedRoleKeys"
            />
          </n-tab-pane>
        </n-tabs>
      </n-space>
    </div>
    <div class="userAllList">
      <UserAllList ref="UserAllListRef" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserAllList from "../components/UserAllList.vue";
import { reactive, ref } from "vue";
import User from "@/api/user";
import Role from "@/api/role";

const state = reactive({
  form: {
    pattern: "",
  },
  data: [],
  roleData: [],
});
const UserAllListRef = ref();

// 获取组织架构列表
const getOrgList = async () => {
  let param = {
    parentId: 0,
  };
  const res = await User.getOrgList(param);
  if (res.status == 200 && res.data.success) {
    state.data = res.data.data;
  } else {
    window.$message.error(res.data.errMessage);
  }
};
getOrgList();

const updateKeys = ref([]);
// 组织架构触发方法
const updateExpandedKeys = (keys: any, option: any) => {
  if (option.length != 0) {
    updateKeys.value = option;
    UserAllListRef.value.sessOrgCode = option[0].orgCode;
    UserAllListRef.value.getUserList(option[0].orgCode, "");
  }
};

// 角色触发方法
const updateExpandedRoleKeys = (keys: any, option: any) => {
  if (option.length != 0) {
    UserAllListRef.value.sessRoleCode = option[0].roleCode;
    UserAllListRef.value.getUserList("", option[0].roleCode);
  }
};

// 获取角色列表
const getRoleList = async () => {
  let param = {};
  const res = await Role.getRoleList(param);
  if (res.status == 200 && res.data.success) {
    state.roleData = res.data.data;
  } else {
    window.$message.error(res.data.errMessage);
  }
};

// 组织架构搜索关键词
const filterPattern = (pattern: string, node: any) => {
  if (!pattern) return true;
  return node.orgName.indexOf(pattern) !== -1;
};

// 角色搜索关键词
const filterPatternRole = (pattern: string, node: any) => {
  if (!pattern) return true;
  return node.roleName.indexOf(pattern) !== -1;
};

// 切换tab触发方法
const updateRole = (name: any) => {
  state.form.pattern = "";
  if (name == 1) {
    getOrgList();
    UserAllListRef.value.sessRoleCode = "";
  } else if (name == 2) {
    getRoleList();
    UserAllListRef.value.sessOrgCode = "";
  }
};
</script>

<style lang="scss" scoped>
.userList {
  display: flex;
  .tree {
    width: 20%;
    .n-space {
      width: 80%;
      margin: 0 auto;
    }
  }
  .userAllList {
    width: 80%;
  }
}
</style>