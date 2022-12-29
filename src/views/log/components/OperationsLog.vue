<template>
  <div>
    <QueryForm :formOption="formOption" @query="query" />
    <DataTable
      :row-key="rowKey"
      :columns="columns"
      :data="state.data"
      :count="state.totalCount"
      :loading="state.loading"
      @handlePage="handlePage"
      @handlePageSize="handlePageSize"
    />
  </div>
</template>

<script lang="ts" setup>
import Log from "@/api/log";
import { reactive } from "vue";

const rowKey = (row: any) => row.id;

// // 查询表单配置
const formOption: Components.IFormOption[] = [
  {
    label: "账号/姓名",
    placeholder: "请输入账号/姓名",
    key: "searchKey",
    type: "input",
  },
];

const state = reactive({
  form: {
    searchKey: undefined,
  },
  pageIndex: 1,
  pageSize: 10,
  totalCount: 0,
  loading: false,
  data: [],
});

// 表格配置
const columns = [
  {
    title: "序号",
    key: "index",
    render: (row: any, index: any) => {
      return (state.pageIndex - 1) * state.pageSize + index + 1;
    },
  },
  {
    title: "操作时间",
    key: "createDate",
  },
  {
    title: "操作人",
    key: "createUserName",
  },
  {
    title: "操作者角色",
    key: "createRoleName",
  },
  {
    title: "操作模块",
    key: "useModule",
  },
  {
    title: "操作类型",
    key: "useType",
  },
  {
    title: "具体操作内容",
    key: "content",
  },
];

const handlePage = (page: number) => {
  state.pageIndex = page;
  getOperationLog();
};

const handlePageSize = (pageSize: number) => {
  state.pageSize = pageSize;
  getOperationLog();
};

// 查询/重置
const query = (_form: any) => {
  state.form = _form;
  getOperationLog();
};

// 获取操作日志列表
const getOperationLog = async () => {
  state.loading = true;
  let param = {
    ...state.form,
    pageIndex: state.pageIndex,
    pageSize: state.pageSize,
  };
  const res = await Log.getOperationLog(param);
  state.loading = false;
  if (res.status == 200 && res.data.success) {
    state.data = res.data.data;
    state.totalCount = res.data.totalCount;
  } else {
    window.$message.error(res.data.errMessage);
  }
};
getOperationLog();
</script>

<style lang="scss" scoped>
</style>