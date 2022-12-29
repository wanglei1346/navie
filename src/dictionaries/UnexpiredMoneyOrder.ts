import { h } from "vue"
import { NInput, NSelect, NInputNumber, NDatePicker, NFormItem } from "naive-ui"
import { currencys } from "./dictionaries"
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-11-01 15:15:05
 * @description 本公司向贵行已贴现而尚未到期的商业汇票配置项
 */
const UnexpiredMoneyOrder = {
  title: "本公司向贵行已贴现而尚未到期的商业汇票",
  active: 1,
  columns: [
    {
      title: "商业汇票号码",
      key: "cdraftNo",
      width: 300,
      fixed: "left",
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.cdraftNo) {
                  return new Error("请输入商业汇票号码")
                }
              },
            },
            path: "cdraftNo",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入商业汇票号码",
                  allowInput: (value: string) => !value || /^\d+$/.test(value),
                  value: row.cdraftNo,
                  "on-update:value"(e: any) {
                    row.cdraftNo = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "贴现人名称",
      key: "discounterName",
      width: 300,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.discounterName) {
                  return new Error("请输入贴现人名称")
                }
              },
            },
            path: "discounterName",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入贴现人名称",
                  value: row.discounterName,
                  "on-update:value"(e: any) {
                    row.discounterName = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "币种",
      key: "currency",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.currency) {
                  return new Error("请选择币种")
                }
              },
            },
            path: "currency",
          },
          {
            default: () =>
              h(
                NSelect,
                {
                  placeholder: "请选择币种",
                  options: currencys,
                  value: row.currency,
                  "on-update:value"(e: any) {
                    row.currency = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "票面金额",
      key: "faceAmount",
      width: 150,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.faceAmount && row.faceAmount !== 0) {
                  return new Error("请输入票面金额")
                }
              },
            },
            path: "faceAmount",
          },
          {
            default: () =>
              h(
                NInputNumber,
                {
                  placeholder: "请输入票面金额",
                  showButton: false,
                  precision: 2,
                  value: row.faceAmount,
                  "on-update:value"(e: any) {
                    row.faceAmount = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "出票日",
      key: "drawDraftDate",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.drawDraftDate) {
                  return new Error("请选择出票日")
                }
              },
            },
            path: "drawDraftDate",
          },
          {
            default: () =>
              h(
                NDatePicker,
                {
                  valueFormat: "yyyy-MM-dd",
                  "value:formatted-value": row.drawDraftDate,
                  "on-update:formatted-value"(e: any) {
                    row.drawDraftDate = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "到期日",
      key: "expireDate",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.expireDate) {
                  return new Error("请选择到期日")
                }
              },
            },
            path: "expireDate",
          },
          {
            default: () =>
              h(
                NDatePicker,
                {
                  valueFormat: "yyyy-MM-dd",
                  "value:formatted-value": row.expireDate,
                  "on-update:formatted-value"(e: any) {
                    row.expireDate = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "贴现日",
      key: "discountDate",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.discountDate) {
                  return new Error("请选择贴现日")
                }
              },
            },
            path: "discountDate",
          },
          {
            default: () =>
              h(
                NDatePicker,
                {
                  valueFormat: "yyyy-MM-dd",
                  "value:formatted-value": row.discountDate,
                  "on-update:formatted-value"(e: any) {
                    row.discountDate = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "贴现率",
      key: "discountRate",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.discountRate) {
                  return new Error("请输入贴现率")
                }
              },
            },
            path: "discountRate",
          },
          {
            default: () =>
              h(
                NInputNumber,
                {
                  showButton: false,
                  precision: 2,
                  placeholder: "请输入贴现率",
                  value: row.discountRate,
                  "on-update:value"(e: any) {
                    row.discountRate = e
                  },
                },
                {
                  suffix: () => "%",
                }
              ),
          }
        )
      },
    },
    {
      title: "贴现净额",
      key: "netAvailable",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.netAvailable && row.netAvailable !== 0) {
                  return new Error("请输入贴现净额")
                }
              },
            },
            path: "netAvailable",
          },
          {
            default: () =>
              h(
                NInputNumber,
                {
                  showButton: false,
                  precision: 2,
                  placeholder: "请输入贴现净额",
                  value: row.netAvailable,
                  "on-update:value"(e: any) {
                    row.netAvailable = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
  ],
}

export default UnexpiredMoneyOrder
