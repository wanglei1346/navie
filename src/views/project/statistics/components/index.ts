import { h } from "vue"
import TableButton from "./TableButton.vue"
// 清空数组null
const removeEmptyArray = (array: any[]) => {
  return array.filter((item) => item)
}
export const tableColumns = (tabName: string) => {
  return removeEmptyArray([
    {
      type: "selection",
    },
    {
      title: "函证编码",
      key: "code",
    },
    {
      title: "所属项目",
      key: "project",
    },
    {
      title: "函证类型",
      key: "type",
    },
    tabName === "send"
      ? {
          title: "函证状态",
          key: "待发函",
        }
      : null,
    tabName !== "send"
      ? {
          title: "科目",
          key: "kemu",
        }
      : null,
    {
      title: "授权单位",
      key: "danwei",
    },
    {
      title: "回函单位",
      key: "hihan",
    },
    tabName === "send"
      ? {
          title: "发函时间",
          key: "sendTime",
        }
      : null,
    tabName === "send"
      ? {
          title: "授权时间",
          key: "anTime",
        }
      : null,
    tabName === "send"
      ? {
          title: "回函时间",
          key: "saveTime",
        }
      : null,
    tabName === "invalidate"
      ? {
          title: "作废时间",
          key: "invalidate",
        }
      : null,
    {
      title: "操作",
      key: "tags",
      render(row: any) {
        return h(TableButton, { tabName: tabName, row }, {})
      },
    },
  ])
}
