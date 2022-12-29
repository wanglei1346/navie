<template>
  <div class="query">
    <QueryForm :formOption="formOption" @query="query" />
    <n-button type="info" @click="edit(1)"> 新建 </n-button>
  </div>
  <div>
    <n-data-table
      :columns="columns"
      :data="state.data"
      :row-key="rowKey"
      :loading="state.loading"
      children-key="sysOrgInfoCOS"
      default-expand-all
    />
  </div>
</template>

<script lang="ts" setup>
import QueryForm from "@/components/QueryForm.vue";
import { h, reactive } from "vue";
import { NButton, NSpace, NPopconfirm } from "naive-ui";
import Dialog from "./Dialog.vue";
import User from "@/api/user";

const rowKey = (row: any) => row.orgCode;

const model = reactive({
  orgName: null,
  orgLeader: null,
  orgLeaderName: null,
  userIdS: null,
  userCodeS: null,
  userS: null,
  orgPid: null,
  description: null,
});

const state = reactive({
  data: [],
  form: {
    keyWord: undefined,
  },
  totalCount: 0,
  loading: false,
});

// 删除
const del = async (row: any) => {
  const res = await User.deleteOrg(row.orgCode);
  if (res.status == 200 && res.data.success) {
    window.$message.success("删除成功");
    getOrgList();
  }
};

// 表格配置
const columns: any = [
  {
    title: "名称",
    key: "orgName",
  },
  {
    title: "状态",
    key: "orgStatus",
    render(row: any) {
      return row.orgStatus == 1 ? "开启" : "禁用";
    },
  },
  {
    title: "更新时间",
    key: "updateDate",
  },
  {
    title: "备注信息",
    key: "description",
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
            // text: true,
            type: "info",
            onClick: () => {
              edit(2, row);
            },
          },
          { default: () => "编辑" }
        ),
        h(
          NButton,
          {
            size: "small",
            type: "info",
            onClick: () => {
              edit(3, row);
            },
          },
          { default: () => "添加" }
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
                  type: "error",
                },
                { default: () => "删除" }
              ),
          }
        ),
      ]);
    },
  },
];

// 查询表单配置
const formOption: Components.IFormOption[] = [
  {
    placeholder: "请输入搜索关键词",
    key: "keyWord",
    type: "input",
  },
];

// 新建/编辑/添加
// type:
// 1: 新建
// 2: 编辑
// 3: 添加
const edit = async (type: number, row?: any) => {
  if (type == 2) {
    const res = await User.OrgDetail(row.orgCode);
    if (res.status == 200 && res.data.success) {
      row.rowData = res.data.data;
      model.orgName = res.data.data.orgName; // 部门名称
      model.orgLeader = res.data.data.orgLeader; // 负责人员
      model.userIdS = res.data.data.userS.map((item: any) => item.userId); // 部门成员
      model.orgPid = res.data.data.orgPid == 0 ? null : res.data.data.orgPid; // 上级部门
      model.description = res.data.data.description; // 部门描述
    } else {
      window.$message.error(res.data.errMessage);
    }
  } else if (type == 3) {
    const res = await User.OrgDetail(row.orgCode);
    if (res.status == 200 && res.data.success) {
      model.orgPid = res.data.data.orgPid == 0 ? null : res.data.data.orgPid; // 上级部门
    } else {
      window.$message.error(res.data.errMessage);
    }
  }
  window.$dialog.info({
    title: type == 1 ? "创建部门" : type == 2 ? "编辑部门" : "添加部门",
    showIcon: false,
    autoFocus: false,
    content: () =>
      h(Dialog, {
        model,
        type,
        row,
      }),
    positiveText: "保存",
    negativeText: "取消",
    maskClosable: false,
    closable: false,
    closeOnEsc: false,
    onPositiveClick: async () => {
      if (type == 3 || type == 1) {
        let orgPid = "";
        if ((type == 1 && model.orgPid) || (type == 3 && model.orgPid)) {
          orgPid = model.orgPid;
        } else if (type == 1 && !model.orgPid) {
          orgPid = "0";
        } else if (type == 3 && !model.orgPid) {
          orgPid = row.orgId;
        }
        const param = {
          sysOrganizationCO: {
            orgName: model.orgName, // 部门名称
            orgLeader: model.orgLeader, // 负责人员
            orgPid: orgPid, // 上级部门
            description: model.description, // 部门描述
          },
          userIdS: model.userIdS, // 部门成员
        };
        const res = await User.getOrgAdd(param);
        if (res.status == 200 && res.data.success) {
          window.$message.success("保存成功");
          getOrgList();
        } else {
          window.$message.error(res.data.errMessage);
        }
      } else if (type == 2) {
        const param = {
          sysOrganizationCO: {
            orgName: model.orgName, // 部门名称
            orgLeader: model.orgLeader, // 负责人员
            orgPid: model.orgPid, // 上级部门
            orgId: row.rowData.orgId, // 部门id
            description: model.description, // 部门描述
          },
          userIdS: model.userIdS, // 部门成员
        };
        const res = await User.getOrgAdd(param);
        if (res.status == 200 && res.data.success) {
          window.$message.success("编辑成功");
          getOrgList();
        } else {
          window.$message.error(res.data.errMessage);
        }
      }
      model.orgName = null;
      model.orgLeader = null;
      model.userIdS = null;
      model.orgPid = null;
      model.description = null;
    },
    onNegativeClick: () => {
      model.orgName = null;
      model.orgLeader = null;
      model.userIdS = null;
      model.orgPid = null;
      model.description = null;
    },
  });
};

// 查询/重置
const query = (_form: any) => {
  state.form = _form;
  getOrgList();
};

// 获取组织架构管理列表
const getOrgList = async () => {
  state.loading = true;
  let param = {
    keyword: state.form.keyWord,
    parentId: 0,
  };
  const res = await User.getOrgList(param);
  if (res.status == 200 && res.data.success) {
    state.loading = false;
    state.data = res.data.data;
  } else {
    state.loading = false;
    window.$message.error(res.data.errMessage);
  }
};
getOrgList();
</script>

<style lang="scss" scoped>
.query {
  display: flex;
  justify-content: space-between;
}
</style>
