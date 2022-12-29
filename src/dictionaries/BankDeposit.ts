import { h } from "vue"
import { NInput, NSelect, NInputNumber, NDatePicker, NFormItem } from "naive-ui"
import { currencys, accountTypes, isFundCollAccts } from "./dictionaries"
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-10-31 20:46:06
 * @description 银行存款配置项
 */
const BankDeposit = {
  title: "银行存款",
  active: 1,
  columns: [
    {
      title: "账户名称",
      key: "accountName",
      width: 300,
      fixed: "left",
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.accountName) {
                  return new Error("请输入账户名称")
                }
              },
            },
            path: "accountName",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入账户名称",
                  value: row.accountName,
                  "on-update:value"(e: any) {
                    row.accountName = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "银行账号",
      key: "bankAccount",
      width: 300,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.bankAccount) {
                  return new Error("请输入银行账号")
                }
              },
            },
            path: "bankAccount",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入银行账号",
                  allowInput: (value: string) => !value || /^\d+$/.test(value),
                  value: row.bankAccount,
                  "on-update:value"(e: any) {
                    row.bankAccount = e
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
      title: "利率",
      key: "interestRate",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.interestRate && row.interestRate !== 0) {
                  return new Error("请输入利率")
                }
              },
            },
            path: "interestRate",
          },
          {
            default: () =>
              h(
                NInputNumber,
                {
                  showButton: false,
                  precision: 2,
                  placeholder: "请输入利率",
                  value: row.interestRate,
                  "on-update:value"(e: number | null) {
                    row.interestRate = e
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
      title: "账户类型",
      key: "accountType",
      width: 300,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.accountType && row.accountType !== 0) {
                  return new Error("请选择账户类型")
                }
              },
            },
            path: "accountType",
          },
          {
            default: () =>
              h(
                NSelect,
                {
                  placeholder: "请选择账户类型",
                  options: accountTypes,
                  value: row.accountType,
                  "on-update:value"(e: any) {
                    row.accountType = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "余额",
      key: "balance",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.balance && row.balance !== 0) {
                  return new Error("请输入余额")
                }
              },
            },
            path: "balance",
          },
          {
            default: () =>
              h(
                NInputNumber,
                {
                  precision: 2,
                  showButton: false,
                  placeholder: "请输入余额",
                  value: row.balance,
                  "on-update:value"(e: any) {
                    row.balance = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "是否属于资金归集账户",
      key: "isFundCollAcct",
      width: 260,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.isFundCollAcct && row.isFundCollAcct !== 0) {
                  return new Error("请选择是否属于资金归集账户")
                }
              },
            },
            path: "isFundCollAcct",
          },
          {
            default: () =>
              h(
                NSelect,
                {
                  placeholder: "请选择是否属于资金归集账户",
                  options: isFundCollAccts,
                  value: row.isFundCollAcct,
                  "on-update:value"(e: any) {
                    row.isFundCollAcct = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "起始日期",
      key: "beginDate",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.beginDate) {
                  return new Error("请选择起始日期")
                }
              },
            },
            path: "beginDate",
          },
          {
            default: () =>
              h(
                NDatePicker,
                {
                  valueFormat: "yyyy-MM-dd",
                  "value:formatted-value": row.beginDate,
                  "on-update:formatted-value"(e: any) {
                    row.beginDate = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "终止日期",
      key: "endDate",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.endDate) {
                  return new Error("请选择终止日期")
                }
              },
            },
            path: "endDate",
          },
          {
            default: () =>
              h(
                NDatePicker,
                {
                  valueFormat: "yyyy-MM-dd",
                  "value:formatted-value": row.endDate,
                  "on-update:formatted-value"(e: any) {
                    row.endDate = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "是否存在冻结、担保或其他使用限制",
      key: "isUseLimit",
      width: 300,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.isUseLimit) {
                  return new Error("请输入是否存在冻结、担保或其他使用限制")
                }
              },
            },
            path: "isUseLimit",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入是否存在冻结、担保或其他使用限制",
                  value: row.isUseLimit,
                  "on-update:value"(e: any) {
                    row.isUseLimit = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "备注",
      key: "remark",
      width: 300,
      fixed: "right",
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.remark) {
                  return new Error("请输入备注")
                }
              },
            },
            path: "remark",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  type: "textarea",
                  placeholder: "请输入备注",
                  autosize: { minRows: 1, maxRows: 5 },
                  showCount: !!row.remark,
                  value: row.remark,
                  onInput(e: any) {
                    row.remark = e
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
export default BankDeposit
