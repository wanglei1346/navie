<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-transfer
      ref="transfer"
      v-model:value="state.keyWord"
      :options="state.options"
      source-filterable
      target-filterable
      source-title="待选列表"
      target-title="已选列表"
      source-filter-placeholder="请输入关键词"
      target-filter-placeholder="请输入关键词"
      @update:value="updateValue"
    />
  </n-config-provider>
</template>

 
<script lang="ts" setup>
import { reactive } from "vue";
import { zhCN, dateZhCN, NConfigProvider } from "naive-ui";
import { useUserStore } from "@/store/user";
import Role from "@/api/role";
const store = useUserStore();

const state = reactive({
  keyWord: undefined,
  options: [],
});

const getList = (data: any) => {
  data.forEach((item: any) => {
    item.label = item.roleName;
    item.value = item.roleCode;
  });
};

// 获取角色列表
const getRoleList = async () => {
  let param = {};
  const res = await Role.getRoleList(param);
  if (res.status == 200 && res.data.success) {
    state.options = res.data.data;
    getList(state.options);
  } else {
    window.$message.error(res.data.errMessage);
  }
};
getRoleList();

// 选中角色触发方法
const updateValue = (value: any) => {
  store.roleIds = value;
};
</script>