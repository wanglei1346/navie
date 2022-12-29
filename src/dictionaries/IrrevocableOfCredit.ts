import { h } from "vue"
import { NInput, NSelect, NInputNumber, NDatePicker, NFormItem } from "naive-ui"
import { currencys } from "./dictionaries"
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-11-01 15:23:40
 * @description 本公司为申请人、由贵行开具的、未履行完毕的不可撤销信用证配置项
 */
const IrrevocableOfCredit = {
  title: "本公司为申请人、由贵行开具的、未履行完毕的不可撤销信用证",
  active: 1,
  columns: [
    {
      title: "信用证号码",
      key: "lcreditNo",
      width: 300,
      fixed: "left",
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.lcreditNo) {
                  return new Error("请输入信用证号码")
                }
              },
            },
            path: "lcreditNo",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入信用证号码",
                  value: row.lcreditNo,
                  "on-update:value"(e: any) {
                    row.lcreditNo = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "受益人",
      key: "beneficiary",
      width: 300,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.beneficiary) {
                  return new Error("请输入受益人")
                }
              },
            },
            path: "beneficiary",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入受益人",
                  value: row.beneficiary,
                  "on-update:value"(e: any) {
                    row.beneficiary = e
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
      title: "信用证金额",
      key: "lcreditAmount",
      width: 150,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.lcreditAmount && row.lcreditAmount !== 0) {
                  return new Error("请输入信用证金额")
                }
              },
            },
            path: "lcreditAmount",
          },
          {
            default: () =>
              h(
                NInputNumber,
                {
                  showButton: false,
                  precision: 2,
                  placeholder: "请输入信用证金额",
                  value: row.lcreditAmount,
                  "on-update:value"(e: any) {
                    row.lcreditAmount = e
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
      title: "未使用金额",
      key: "unusedAmount",
      width: 300,
      fixed: "right",
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.unusedAmount && row.unusedAmount !== 0) {
                  return new Error("请输入未使用金额")
                }
              },
            },
            path: "unusedAmount",
          },
          {
            default: () =>
              h(
                NInputNumber,
                {
                  showButton: false,
                  precision: 2,
                  placeholder: "请输入未使用金额",
                  value: row.unusedAmount,
                  "on-update:value"(e: any) {
                    row.unusedAmount = e
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

export default IrrevocableOfCredit
