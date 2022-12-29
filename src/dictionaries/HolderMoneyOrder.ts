import { h } from "vue"
import { NInput, NSelect, NInputNumber, NDatePicker, NFormItem } from "naive-ui"
import { currencys } from "./dictionaries"
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-11-01 15:19:19
 * @description 本公司为持票人且由贵行托收的商业汇票配置项
 */
const HolderMoneyOrder = {
  title: "本公司为持票人且由贵行托收的商业汇票",
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
      title: "承兑人名称",
      key: "acceptorName",
      width: 300,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.acceptorName) {
                  return new Error("请输入承兑人名称")
                }
              },
            },
            path: "acceptorName",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入承兑人名称",
                  value: row.acceptorName,
                  "on-update:value"(e: any) {
                    row.acceptorName = e
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
                  showButton: false,
                  precision: 2,
                  placeholder: "请输入票面金额",
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
  ],
}

export default HolderMoneyOrder
