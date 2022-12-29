<template>
  <div class="query">
    <QueryForm :formOption="formOption" @query="query" />
    <n-space>
      <n-button
        type="info"
        @click="assignRoles(handleCheckKeys)"
        :disabled="handleCheckKeys.length == 0"
      >
        批量分配角色
      </n-button>
      <n-button type="info" @click="edit(1)"> 新增 </n-button>
    </n-space>
  </div>
  <DataTable
    :row-key="rowKey"
    :columns="columns"
    :data="state.data"
    :count="state.totalCount"
    :loading="state.loading"
    @handleCheck="handleCheck"
    @handlePage="handlePage"
    @handlePageSize="handlePageSize"
  />
</template>

<script lang="ts" setup>
import QueryForm from "@/components/QueryForm.vue";
import { h, ref, reactive } from "vue";
import { NButton, NSpace } from "naive-ui";
import { useRouter } from "vue-router";
import RoleDialog from "./RoleDialog.vue";
import User from "@/api/user";
import { useUserStore } from "@/store/user";

const router = useRouter();
const store = useUserStore();
const rowKey = (row: any) => row.userId;

const state = reactive({
  form: {
    keyword: undefined,
    orgCode: undefined,
    roleCode: undefined,
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
    placeholder: "搜索关键词",
    key: "keyword",
    type: "input",
  },
];

// 表格配置
const columns = [
  {
    type: "selection",
  },
  {
    title: "序号",
    key: "index",
    render: (row: any, index: any) => {
      return (state.pageIndex - 1) * state.pageSize + index + 1;
    },
  },
  {
    title: "账号",
    key: "userAccount",
  },
  {
    title: "姓名",
    key: "cnName",
  },
  {
    title: "手机号码",
    key: "userMobile",
  },
  {
    title: "邮箱",
    key: "userEmail",
  },
  {
    title: "部门",
    key: "orgName",
  },
  {
    title: "角色",
    key: "userRoles[0].roleName",
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
      ]);
    },
  },
];

// 新增/编辑
const edit = (type: any, row?: any) => {
  router.push({
    path: "/user/edit",
    query: {
      row: type == 1 ? "" : JSON.stringify(row),
      type: type,
    },
  });
};

const handleCheckKeys = ref([]);
// 表格选中触发方法
const handleCheck = (checkValue: any) => {
  handleCheckKeys.value = checkValue;
};

const handlePage = (page: number) => {
  state.pageIndex = page;
  getUserList();
};

const handlePageSize = (pageSize: number) => {
  state.pageSize = pageSize;
  getUserList();
};

// 查询/重置
const query = (_form: any) => {
  state.form = _form;
  state.pageIndex = 1;
  getUserList();
};

// 批量分配角色
const assignRoles = (handleCheckKeys: any) => {
  window.$dialog.info({
    title: "批量分配角色",
    autoFocus: false,
    showIcon: false,
    maskClosable: false,
    closable: false,
    closeOnEsc: false,
    content: () =>
      h(
        RoleDialog
        // {
        //
        // },
      ),
    positiveText: "保存",
    negativeText: "取消",
    onPositiveClick: async () => {
      const res = await User.batchRole({
        roleCodeS: store.roleIds,
        userIdS: handleCheckKeys,
      });
      if (res.status == 200 && res.data.success) {
        window.$message.success("操作成功");
        getUserList();
      } else {
        window.$message.error(res.data.errMessage);
      }
    },
    onNegativeClick: () => {},
  });
};

const sessOrgCode = ref();
const sessRoleCode = ref();

// 获取用户列表
const getUserList = async (orgCode?: any, roleCode?: any) => {
  state.loading = true;
  let param = {
    pageIndex: state.pageIndex,
    pageSize: state.pageSize,
    keyword: state.form.keyword,
    orgCode: sessOrgCode.value,
    roleCode: sessRoleCode.value,
  };
  const res = await User.getUserList(param);
  if (res.status == 200 && res.data.success) {
    state.loading = false;
    state.totalCount = res.data.totalCount;
    state.data = res.data.data;
  } else {
    state.loading = false;
    window.$message.error(res.data.errMessage);
  }
};
getUserList();

defineExpose({
  getUserList,
  sessOrgCode,
  sessRoleCode,
  state,
});
</script>

<style lang="scss" scoped>
.query {
  // display: flex;
  // justify-content: space-between;
  margin-bottom: 10px;
}
</style>