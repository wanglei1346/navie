<template>
  <n-card
    :title="route.query.row ? '编辑系统角色' : '新增系统角色'"
    style="margin-bottom: 16px"
  >
    <n-form
      ref="formRef"
      class="form"
      :model="state.form"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      size="large"
      :style="{
        maxWidth: '640px',
      }"
    >
      <n-form-item path="userAccount" label="账号：">
        <n-input
          v-model:value="state.form.userAccount"
          @keydown.enter.prevent
          placeholder="请输入账号"
        />
      </n-form-item>
      <n-form-item path="userPwd" label="密码：" v-if="!route.query.row">
        <n-input
          v-model:value="state.form.userPwd"
          type="password"
          @keydown.enter.prevent
          placeholder="请输入密码"
        />
      </n-form-item>
      <n-form-item path="cnName" label="姓名：">
        <n-input
          v-model:value="state.form.cnName"
          @keydown.enter.prevent
          placeholder="请输入姓名"
        />
      </n-form-item>
      <n-form-item path="userMobile" label="手机号码：">
        <n-input
          v-model:value="state.form.userMobile"
          @keydown.enter.prevent
          placeholder="请输入手机号码"
        />
      </n-form-item>
      <n-form-item path="userEmail" label="电子邮箱：">
        <n-input
          v-model:value="state.form.userEmail"
          @keydown.enter.prevent
          placeholder="请输入电子邮箱"
        />
      </n-form-item>
      <n-form-item path="orgCode" label="部门：" :rule="departmentRule">
        <n-tree-select
          v-model:value="state.form.orgCode"
          placeholder="请选择部门"
          :options="state.departmentOptions"
          key-field="orgCode"
          label-field="orgName"
          children-field="sysOrgInfoCOS"
          checkable
          clearable
          default-expand-all
        />
      </n-form-item>
      <n-form-item path="userRoles" label="角色：" :rule="roleRule">
        <n-select
          v-model:value="state.form.userRoles"
          multiple
          :options="state.roleOptions"
          placeholder="请选择角色"
          label-field="roleName"
          value-field="roleCode"
        />
      </n-form-item>
      <n-form-item path="userStatus" label="状态：" :rule="userStatusRule">
        <n-select
          v-model:value="state.form.userStatus"
          :options="statusOptions"
          placeholder="请选择状态"
        />
      </n-form-item>
      <n-form-item>
        <n-button @click="router.go(-1)">返回</n-button>
        <n-button type="info" @click="submit">确认</n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { rules } from "./Edit";
import { useRouter, useRoute } from "vue-router";
import Role from "@/api/role";
import User from "@/api/user";

const router = useRouter();
const route = useRoute();

const state = reactive({
  form: {
    userAccount: undefined,
    userPwd: undefined,
    userId: undefined,
    cnName: undefined,
    userMobile: undefined,
    userEmail: undefined,
    orgName: undefined,
    orgCode: undefined,
    userRoles: [],
    userStatus: undefined,
  },
  departmentOptions: [],
  roleOptions: [],
});

const formRef = ref();

// 获取部门列表
const getOrgList = async () => {
  let param = {
    parentId: 0,
  };
  const res = await User.getOrgList(param);
  if (res.status == 200 && res.data.success) {
    res.data.data.forEach((item: any) => {
      if (item.sysOrgInfoCOS.length != 0) {
        item.isLeaf = false;
      }
    });
    state.departmentOptions = res.data.data;
  } else {
    window.$message.error(res.data.errMessage);
  }
};
getOrgList();

// 状态配置
const statusOptions = [
  {
    label: "开启",
    value: 1,
  },
  {
    label: "禁用",
    value: 0,
  },
];

// 部门校验
const departmentRule = [
  {
    required: true,
    trigger: "change",
    validator: (rule: any, value: any, callback: any) => {
      if (!state.form.orgCode) callback(new Error("请选择部门"));
      callback();
    },
  },
];

// 状态校验
const userStatusRule = [
  {
    required: true,
    trigger: "change",
    validator: (rule: any, value: any, callback: any) => {
      if (!state.form.userStatus && state.form.userStatus != 0)
        callback(new Error("请选择状态"));
      callback();
    },
  },
];

// 角色校验
const roleRule = [
  {
    required: true,
    trigger: "change",
    validator: (rule: any, value: any, callback: any) => {
      if (!state.form.userRoles) callback(new Error("请选择角色"));
      callback();
    },
  },
];

// 确认
const submit = () => {
  formRef.value.validate(async (error: any) => {
    if (!error) {
      let param = {
        sysUserCO: {
          userAccount: state.form.userAccount,
          userPwd: state.form.userPwd || "",
          cnName: state.form.cnName,
          userMobile: state.form.userMobile,
          userEmail: state.form.userEmail,
          orgCode: state.form.orgCode,
          userStatus: state.form.userStatus,
          userId: state.form.userId || "",
        },
        roleCodeS: state.form.userRoles,
      };
      const res = await User.editUser(param);
      if (res.status == 200 && res.data.success) {
        window.$message.success(route.query.row ? "编辑成功" : "新增成功");
      } else {
        window.$message.error(res.data.errMessage);
      }
      router.push("/user");
    }
  });
};

// 编辑回显数据
if (route.query.row) {
  let row: any | string = route.query.row;
  state.form = JSON.parse(row);
  const roleCode = JSON.parse(row).userRoles;
  let list: any = [];
  roleCode.forEach((item: any) => {
    list.push(item.roleCode);
  });
  state.form.userRoles = list;
}

// 获取角色字典
const getRoleDicks = async () => {
  const res = await Role.getRoleDicks();
  if (res.status == 200 && res.data.success) {
    state.roleOptions = res.data.data;
  } else {
    window.$message.error(res.data.errMessage);
  }
};
getRoleDicks();
</script>

<style lang="scss" scoped>
.form {
  margin: 0 auto;
  :deep .n-form-item-blank {
    justify-content: center;
    .n-button {
      margin: 0 20px;
    }
  }
}
</style>