import { h } from "vue"
import { NInput, NInputNumber, NDatePicker, NFormItem } from "naive-ui"
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-10-31 21:01:53
 * @description 本公司作为贷款方的委托贷款配置项
 */
const LenderOfLoans = {
  title: "本公司作为贷款方的委托贷款",
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
      title: "银行结算账号",
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
                  return new Error("请输入银行结算账号")
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
                  placeholder: "请输入银行结算账号",
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
      title: "资金借入方",
      key: "fundBorrower",
      width: 300,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.fundBorrower) {
                  return new Error("请输入资金借入方")
                }
              },
            },
            path: "fundBorrower",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入资金借入方",
                  value: row.fundBorrower,
                  "on-update:value"(e: any) {
                    row.fundBorrower = e
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
                  "on-update:value"(e: any) {
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
                if (!row.balance) {
                  return new Error("请输入余额")
                }
              },
            },
            path: "balance",
          },
          {
            default: () =>
              h(NInputNumber, {
                showButton: false,
                precision: 2,
                placeholder: "请输入余额",
                value: row.balance,
                "on-update:value"(e: any) {
                  row.balance = e
                },
              }),
          }
        )
      },
    },
    {
      title: "贷款起始日期",
      key: "loanStartDate",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.loanStartDate) {
                  return new Error("请选择贷款起始日期")
                }
              },
            },
            path: "loanStartDate",
          },
          {
            default: () =>
              h(
                NDatePicker,
                {
                  valueFormat: "yyyy-MM-dd",
                  "value:formatted-value": row.loanStartDate,
                  "on-update:formatted-value"(e: any) {
                    row.loanStartDate = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "贷款到期日期",
      key: "loanEndDate",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.loanEndDate) {
                  return new Error("请选择贷款到期日期")
                }
              },
            },
            path: "loanEndDate",
          },
          {
            default: () =>
              h(
                NDatePicker,
                {
                  valueFormat: "yyyy-MM-dd",
                  "value:formatted-value": row.loanEndDate,
                  "on-update:formatted-value"(e: any) {
                    row.loanEndDate = e
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
                  "on-update:value"(e: any) {
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

export default LenderOfLoans
