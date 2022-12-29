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
import QueryForm from "@/components/QueryForm.vue";
import { reactive } from "vue";
import Log from "@/api/log";

const rowKey = (row: any) => row.userId;

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

// 查询表单配置
const formOption: Components.IFormOption[] = [
  {
    label: "账号/操作人",
    placeholder: "请输入账号/操作人",
    key: "searchKey",
    type: "input",
  },
];

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
    title: "账号",
    key: "account",
  },
  {
    title: "操作人",
    key: "user",
  },
  {
    title: "函证状态",
    key: "confirmationStatus",
  },
  {
    title: "操作时间",
    key: "createDate",
  },
  {
    title: "函证编号",
    key: "confirmationCode",
  },
];

const handlePage = (page: number) => {
  state.pageIndex = page;
  getCochainLog();
};

const handlePageSize = (pageSize: number) => {
  state.pageSize = pageSize;
  getCochainLog();
};

// // 查询/重置
const query = (_form: any) => {
  state.form = _form;
  getCochainLog();
};

// 获取函证日志列表
const getCochainLog = async () => {
  state.loading = true;
  let param = {
    ...state.form,
    pageIndex: state.pageIndex,
    pageSize: state.pageSize,
  };
  const res = await Log.getCochainLog(param);
  state.loading = false;
  if (res.status == 200 && res.data.success) {
    state.data = res.data.data;
    state.totalCount = res.data.totalCount;
  } else {
    window.$message.error(res.data.errMessage);
  }
};
getCochainLog();
</script>

<style lang="scss" scoped>
</style>