<template>
  <div class="query">
    <QueryForm :formOption="formOption" @query="query" />
    <n-button type="info" @click="edit(1)"> 添加系统角色 </n-button>
  </div>
  <DataTable
    :row-key="rowKey"
    :columns="columns"
    :data="state.data"
    :loading="state.loading"
    :count="state.totalCount"
    @handlePage="handlePage"
    @handlePageSize="handlePageSize"
  />
</template>

<script lang="ts" setup>
import QueryForm from "@/components/QueryForm.vue";
import { h, ref, reactive } from "vue";
import { DataTableRowKey, NButton, NSpace, NPopconfirm } from "naive-ui";
import { useRouter } from "vue-router";
import Role from "@/api/role";

const router = useRouter();

const rowKey = (row: any) => row.roleName;

const state = reactive({
  form: {
    keyWord: undefined,
  },
  pageIndex: 1,
  pageSize: 10,
  totalCount: 0,
  data: [],
  loading: false,
});

// 查询表单配置
const formOption: Components.IFormOption[] = [
  {
    placeholder: "请输入角色名称/ID",
    key: "keyword",
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
    title: "系统角色名称",
    key: "roleName",
  },
  {
    title: "系统角色ID",
    key: "roleId",
  },
  {
    title: "描述",
    key: "describe",
  },
  {
    title: "角色人数",
    key: "userCount",
  },
  {
    title: "创建时间",
    key: "createDate",
  },
  {
    title: "操作",
    key: "tags",
    render(row: any) {
      return h(NSpace, {}, () => [
        h(
          NButton,
          {
            size: "small",
            text: true,
            type: "info",
            onClick: () => edit(2, row),
          },
          { default: () => "编辑" }
        ),
        h(
          NPopconfirm,
          {
            onPositiveClick: () => del(row),
          },
          {
            default: () => "确定要删除吗？",
            trigger: () =>
              h(
                NButton,
                {
                  size: "small",
                  text: true,
                  type: "info",
                },
                { default: () => "删除" }
              ),
          }
        ),
      ]);
    },
  },
];

// 删除
const del = async (row: any) => {
  const res = await Role.deleteRole(row.roleCode);
  if (res.status == 200 && res.data.success) {
    getRoleList();
    window.$message.success("删除成功");
  } else {
    window.$message.success(res.data.errMessage);
  }
};

const handlePage = (page: number) => {
  state.pageIndex = page;
  getRoleList();
};

const handlePageSize = (pageSize: number) => {
  state.pageSize = pageSize;
  getRoleList();
};

// 查询/重置
const query = (_form: any) => {
  state.form = _form;
  state.pageIndex = 1;
  getRoleList();
};

// 添加/编辑
const edit = (type: number, row?: any) => {
  router.push({
    path: "/role/edit",
    query: {
      type: type == 1 ? "add" : "edit",
      row: type == 1 ? "" : JSON.stringify(row),
    },
  });
};

// 获取角色列表
const getRoleList = async () => {
  state.loading = true;
  let param = {
    pageIndex: state.pageIndex,
    pageSize: state.pageSize,
    ...state.form,
  };
  const res = await Role.getRoleList(param);
  if (res.status == 200 && res.data.success) {
    state.totalCount = res.data.totalCount;
    state.data = res.data.data;
    state.loading = false;
  } else {
    window.$message.error(res.data.errMessage);
    state.loading = false;
  }
};
getRoleList();
</script>

<style lang="scss" scoped>
.query {
  // display: flex;
  // justify-content: space-between;
  margin-bottom: 10px;
}
</style>