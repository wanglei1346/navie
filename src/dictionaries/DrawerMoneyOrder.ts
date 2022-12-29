import { h } from "vue"
import { NInput, NSelect, NInputNumber, NDatePicker, NFormItem } from "naive-ui"
import { currencys } from "./dictionaries"
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-11-01 15:05:51
 * @description 本公司为出票人且由贵行承兑而未支付的银行承兑汇票配置项
 */
const DrawerMoneyOrder = {
  title: "本公司为出票人且由贵行承兑而未支付的银行承兑汇票",
  active: 1,
  columns: [
    {
      title: "银行承兑汇票号码",
      key: "bankAdraftNo",
      width: 300,
      fixed: "left",
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.bankAdraftNo) {
                  return new Error("请输入银行承兑汇票号码")
                }
              },
            },
            path: "bankAdraftNo",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入银行承兑汇票号码",
                  allowInput: (value: string) => !value || /^\d+$/.test(value),
                  value: row.bankAdraftNo,
                  "on-update:value"(e: any) {
                    row.bankAdraftNo = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "结算账户账号",
      key: "settleAccount",
      width: 300,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.settleAccount) {
                  return new Error("请输入结算账户账号")
                }
              },
            },
            path: "settleAccount",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入结算账户账号",
                  allowInput: (value: string) => !value || /^\d+$/.test(value),
                  value: row.settleAccount,
                  "on-update:value"(e: any) {
                    row.settleAccount = e
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
                if (!row.currency && row.currency !== 0) {
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
      title: "质押品",
      key: "collateralSecurity",
      width: 300,
      fixed: "right",
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.collateralSecurity) {
                  return new Error("请输入质押品")
                }
              },
            },
            path: "collateralSecurity",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入质押品",
                  value: row.collateralSecurity,
                  "on-update:value"(e: any) {
                    row.collateralSecurity = e
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

export default DrawerMoneyOrder
