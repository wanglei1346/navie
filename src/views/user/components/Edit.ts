// 新增角色表单验证
export const rules = {
  userAccount: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur",
    },
  ],
  userPwd: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur",
    },
  ],
  cnName: [
    {
      required: true,
      message: "请输入姓名",
      trigger: "blur",
    },
  ],
  userMobile: [
    {
      required: true,
      message: "请选择手机号码",
      trigger: "blur",
    },
  ],
}

// 弹窗角色表单验证
export const dialogRules = {
  orgName: [
    {
      required: true,
      message: "请输入部门名称",
      trigger: "blur",
    },
  ],
  description: [
    {
      required: true,
      message: "请输入部门描述",
      trigger: "blur",
    },
  ],
}
