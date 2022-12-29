<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-form
      ref="formRef"
      class="form"
      :model="model"
      :rules="dialogRules"
      label-placement="left"
      label-width="auto"
      size="large"
      require-mark-placement="right-hanging"
      :style="{
        maxWidth: '640px',
      }"
    >
      <n-form-item label="部门名称：" path="orgName">
        <n-input v-model:value="model.orgName" placeholder="请输入部门名称" />
      </n-form-item>
      <n-form-item label="负责人员：" path="orgLeader" :rule="personRule">
        <n-select
          v-model:value="model.orgLeader"
          filterable
          placeholder="请选择负责人员"
          :options="state.departmentPerOptions"
          label-field="userName"
          value-field="userId"
          clearable
        />
      </n-form-item>
      <n-form-item label="部门成员：" path="userIdS" :rule="memberRule">
        <n-select
          v-model:value="model.userIdS"
          filterable
          placeholder="请选择部门成员"
          :options="state.departmentPerOptions"
          label-field="userName"
          value-field="userId"
          multiple
          clearable
        />
      </n-form-item>
      <n-form-item label="选择上级部门：" path="orgPid">
        <n-tree-select
          v-model:value="model.orgPid"
          :options="state.departmentOptions"
          key-field="orgId"
          label-field="orgName"
          children-field="sysOrgInfoCOS"
          checkable
          clearable
          default-expand-all
          :disabled="props.type == 3"
        />
      </n-form-item>
      <n-form-item label="部门描述：" path="description">
        <n-input
          v-model:value="model.description"
          type="textarea"
          maxlength="100"
          show-count
          placeholder="请输入部门描述"
        />
      </n-form-item>
    </n-form>
  </n-config-provider>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { dialogRules } from "./Edit";
import User from "@/api/user";
import { NConfigProvider } from "naive-ui";
import { zhCN, dateZhCN } from "naive-ui";
type IProps = {
  model: any;
  type: any;
  row: any;
};

const props = defineProps<IProps>();

const state = reactive({
  departmentPerOptions: [], // 负责人员&部门成员
  departmentOptions: [], // 上级部门
});

const getOrgList = (data: any) => {
  data.forEach((item: any) => {
    if (item.sysOrgInfoCOS.length != 0) {
      item.isLeaf = false;
      getOrgList(item.sysOrgInfoCOS);
    } else {
      item.isLeaf = true;
    }
  });
};
// 获取上级部门列表
const getOrgPerList = async () => {
  let param = {
    parentId: 0,
  };
  const res = await User.getOrgList(param);
  if (res.status == 200 && res.data.success) {
    getOrgList(res.data.data);
    state.departmentOptions = res.data.data;
  } else {
    window.$message.error(res.data.errMessage);
  }
};
getOrgPerList();

// 获取负责人员/部门成员列表
const getOrgPerson = async () => {
  let param = {};
  const res = await User.getOrgUserList(param);
  if (res.status == 200 && res.data.success) {
    res.data.data.map((item: any) => {
      item.userName = `${item.cnName}（${item.userAccount}）`;
    });
    state.departmentPerOptions = res.data.data;
  } else {
    window.$message.error(res.data.errMessage);
  }
};
getOrgPerson();

// 负责人员校验
const personRule = [
  {
    required: true,
    trigger: "change",
    validator: (rule: any, value: any, callback: any) => {
      // if (personKeys.value.length == 0) callback(new Error("请选择负责人员"));
      if (!props.model.orgLeader) callback(new Error("请选择负责人员"));
      callback();
    },
  },
];

// 部门成员校验
const memberRule = [
  {
    required: true,
    trigger: "change",
    validator: (rule: any, value: any, callback: any) => {
      if (props.model.userIdS.length == 0)
        callback(new Error("请选择部门成员"));
      callback();
    },
  },
];
</script>

<style lang="scss" scoped>
.form {
  margin: 0 auto;
}
</style>
