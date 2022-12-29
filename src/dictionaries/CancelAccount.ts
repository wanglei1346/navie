import { h } from "vue"
import { NInput, NSelect, NDatePicker, NFormItem } from "naive-ui"
import { currencys } from "./dictionaries"
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-10-31 20:56:21
 * @description 期间内注销账户信息配置项
 */
const CancelAccount = {
  title: "期间内注销账户信息",
  active: 1,
  columns: [
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
      title: "截止日期",
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
                  return new Error("请选择截止日期")
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
      title: "账户名称",
      key: "accountName",
      width: 300,
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
      title: "注销账户日",
      key: "closeAcctDate",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.closeAcctDate) {
                  return new Error("请选择注销账户日")
                }
              },
            },
            path: "closeAcctDate",
          },
          {
            default: () =>
              h(
                NDatePicker,
                {
                  placeholder: "请选择注销账户日",
                  valueFormat: "yyyy-MM-dd",
                  "value:formatted-value": row.closeAcctDate,
                  "on-update:formatted-value"(e: any) {
                    row.closeAcctDate = e
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

export default CancelAccount
