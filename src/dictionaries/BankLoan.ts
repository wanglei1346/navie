import { h } from "vue"
import { NInput, NSelect, NInputNumber, NDatePicker, NFormItem } from "naive-ui"
import { currencys } from "./dictionaries"
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-10-31 20:48:27
 * @description 银行借款配置项
 */
const BankLoan = {
  title: "银行借款",
  active: 1,
  columns: [
    {
      title: "借款人名称",
      key: "borrowerName",
      width: 300,
      fixed: "left",
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.borrowerName) {
                  return new Error("请输入借款人名称")
                }
              },
            },
            path: "borrowerName",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入借款人名称",
                  value: row.borrowerName,
                  "on-update:value"(e: any) {
                    row.borrowerName = e
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
                  placeholder: "请输入借款人名称",
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
              h(
                NInputNumber,
                {
                  showButton: false,
                  precision: 2,
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
      title: "借款日期",
      key: "borrowDate",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.borrowDate) {
                  return new Error("请选择借款日期")
                }
              },
            },
            path: "borrowDate",
          },
          {
            default: () =>
              h(
                NDatePicker,
                {
                  valueFormat: "yyyy-MM-dd",
                  "value:formatted-value": row.borrowDate,
                  "on-update:formatted-value"(e: any) {
                    row.borrowDate = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "到期日期",
      key: "matureDate",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.matureDate) {
                  return new Error("请选择到期日期")
                }
              },
            },
            path: "matureDate",
          },
          {
            default: () =>
              h(
                NDatePicker,
                {
                  valueFormat: "yyyy-MM-dd",
                  "value:formatted-value": row.matureDate,
                  "on-update:formatted-value"(e: any) {
                    row.matureDate = e
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
                if (!row.interestRate) {
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
      title: "抵押品/(担保人)",
      key: "mortgage",
      width: 300,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.mortgage) {
                  return new Error("请输入抵押品/(担保人)")
                }
              },
            },
            path: "mortgage",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入抵押品/(担保人)",
                  value: row.mortgage,
                  "on-update:value"(e: any) {
                    row.mortgage = e
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
export default BankLoan
