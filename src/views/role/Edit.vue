<template>
  <n-card
    :title="route.query.type == 'add' ? '新增系统角色' : '编辑系统角色'"
    style="margin-bottom: 16px"
  >
    <n-form
      ref="formRef"
      :model="state.form"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      size="large"
      :style="{
        maxWidth: '640px',
      }"
    >
      <n-form-item path="roleName" label="角色名称：">
        <n-input
          v-model:value="state.form.roleName"
          @keydown.enter.prevent
          placeholder="请输入角色名称"
          clearable
        />
      </n-form-item>
      <n-form-item path="roleCode" label="角色编码：">
        <n-input
          v-model:value="state.form.roleCode"
          @keydown.enter.prevent
          placeholder="请输入角色编码"
          clearable
        />
      </n-form-item>
      <n-form-item path="description" label="角色说明：">
        <n-input
          type="textarea"
          maxlength="300"
          show-count
          v-model:value="state.form.description"
          @keydown.enter.prevent
          placeholder="请输入备注信息"
          clearable
        />
      </n-form-item>
      <n-form-item path="dataSrc" label="数据来源：">
        <n-select
          v-model:value="state.form.dataSrc"
          placeholder="请选择数据来源"
          :options="sourceOptions"
          clearable
        />
      </n-form-item>
      <n-form-item path="dataAuth" label="数据权限：">
        <n-select
          v-model:value="state.form.dataAuth"
          placeholder="请选择数据权限"
          :options="accessOptions"
          clearable
        />
      </n-form-item>
      <!-- <n-form-item path="funcConfig" label="功能配置：" :rule="chooseRule" > -->
      <n-form-item path="funcConfig" label="功能配置：">
        <n-tree
          block-line
          :data="state.funcConfig"
          checkable
          cascade
          expand-on-click
          selectable
          label-field="menuName"
          key-field="menuId"
          allow-checking-not-loaded
          default-expand-all
          :default-checked-keys="checkedKeyList"
          @update:checked-keys="checkedKeys"
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
import { useRouter, useRoute } from "vue-router";
import Role from "@/api/role";

const router = useRouter();
const route = useRoute();
const formRef = ref();

const state = reactive({
  form: {
    roleName: null,
    roleCode: null,
    description: null,
    dataSrc: null,
    dataAuth: null,
  },
  funcConfig: [],
});

// 编辑回显数据
if (route.query.type == "edit") {
  let row: any | string = route.query.row;
  state.form = JSON.parse(row);
}

// 新增角色表单验证
const rules = {
  roleName: [
    {
      required: true,
      validator(rule: any, value: any) {
        if (!value) {
          return new Error("请输入角色名称");
        }
      },
      // message: "请输入角色名称",
      trigger: "blur",
    },
  ],
  roleCode: [
    {
      required: true,
      validator(rule: any, value: any) {
        if (!value) {
          return new Error("请输入角色编码");
        }
      },
      // message: "请输入角色编码",
      trigger: "blur",
    },
  ],
  dataSrc: [
    {
      required: true,
      validator(rule: any, value: number) {
        if (!value && value !== 0) {
          return new Error("请选择数据来源");
        }
      },
      // message: "请选择数据来源",
      trigger: "change",
    },
  ],
  dataAuth: [
    {
      required: true,
      validator(rule: any, value: number) {
        if (!value && value !== 0) {
          return new Error("请选择数据权限");
        }
      },
      trigger: "change",
    },
  ],
};

// 数据来源
const sourceOptions = [
  {
    label: "系统",
    value: 0,
  },
  {
    label: "三方",
    value: 1,
  },
];

// 数据权限
const accessOptions = [
  {
    label: "个人级",
    value: 0,
  },
  {
    label: "组织级",
    value: 1,
  },
  {
    label: "组织及下属组织",
    value: 2,
  },
  {
    label: "全量数据",
    value: 3,
  },
];

// 获取功能配置
const getMenus = async () => {
  let param = {
    roleCode: state.form.roleCode || "",
  };
  const res = await Role.getMenus(param);
  if (res.status == 200 && res.data.success) {
    state.funcConfig = res.data.data;
    getChecked(state.funcConfig);
  }
};
getMenus();

// 功能配置选中项
const checkedKeyList = ref<string[]>([]);
const checkedKey = ref([]);

// 默认勾选
const getChecked = (data: any) => {
  data.forEach((item: any) => {
    if (item.isSelected == 1) {
      checkedKeyList.value.push(item.menuId);
    }
    if (item.children) {
      getChecked(item.children);
    } else {
      return;
    }
  });
};

const clearChecked = (data: any) => {
  data.forEach((item: any) => {
    item.isSelected = 0;
    if (item.children) {
      clearChecked(item.children);
    }
  });
};
// 功能配置触发方法
const checkedKeys = (keys: any, option: any) => {
  clearChecked(state.funcConfig);
  option.forEach((item: any) => {
    item.isSelected = 1;
  });
  checkedKey.value = keys;
};

// 确认
const submit = async () => {
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      // 成功
      // 添加/编辑  角色
      const res1 = await Role.addRole({
        sysRoleCO: state.form,
      });
      // 添加/编辑  权限
      let param = {
        menus: state.funcConfig,
        roleCode: state.form.roleCode,
      };
      const res2 = await Role.editMenus(param);
      if (
        res1.status == 200 &&
        res1.data.success &&
        res2.status == 200 &&
        res2.data.success
      ) {
        window.$message.success(
          route.query.type == "edit" ? "编辑成功" : "新增成功"
        );
        router.push("/role");
      } else {
        window.$message.success(res1.data.errMessage || res2.data.errMessage);
      }
    }
  });
};
</script>

<style lang="scss" scoped>
:deep .n-form-item-blank {
  // justify-content: center;
  .n-button {
    margin: 0 20px;
  }
}
</style>