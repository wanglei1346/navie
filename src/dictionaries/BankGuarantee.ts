import { h } from "vue"
import { NInput, NSelect, NInputNumber, NDatePicker, NFormItem } from "naive-ui"
import { currencys, guarWays } from "./dictionaries"
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-11-01 11:46:26
 * @description 被审计单位为其他单位提供的以银行为担保受益人的担保配置项
 */
const BankGuarantee = {
  // guaranteeOtherCOList
  title: "被审计单位为其他单位提供的以银行为担保受益人的担保",
  active: 1,
  columns: [
    {
      title: "被担保人",
      key: "guaredPerson",
      width: 300,
      fixed: "left",
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.guaredPerson) {
                  return new Error("请输入被担保人")
                }
              },
            },
            path: "guaredPerson",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入被担保人",
                  value: row.guaredPerson,
                  "on-update:value"(e: any) {
                    row.guaredPerson = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "担保方式",
      key: "guarWay",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.guarWay && row.guarWay !== 0) {
                  return new Error("请选择担保方式")
                }
              },
            },
            path: "guarWay",
          },
          {
            default: () =>
              h(
                NSelect,
                {
                  placeholder: "请选择担保方式",
                  options: guarWays,
                  value: row.guarWay,
                  "on-update:value"(e: any) {
                    row.guarWay = e
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
      key: "guarBalance",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.guarBalance && row.guarBalance !== 0) {
                  return new Error("请输入余额")
                }
              },
            },
            path: "guarBalance",
          },
          {
            default: () =>
              h(NInputNumber, {
                showButton: false,
                precision: 2,
                placeholder: "请输入余额",
                value: row.guarBalance,
                "on-update:value"(e: any) {
                  row.guarBalance = e
                },
              }),
          }
        )
      },
    },
    {
      title: "担保到期日",
      key: "guarExpireDate",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.guarExpireDate) {
                  return new Error("请选择担保到期日")
                }
              },
            },
            path: "guarExpireDate",
          },
          {
            default: () =>
              h(
                NDatePicker,
                {
                  valueFormat: "yyyy-MM-dd",
                  "value:formatted-value": row.guarExpireDate,
                  "on-update:formatted-value"(e: any) {
                    row.guarExpireDate = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "担保合同编号",
      key: "guarContractNo",
      width: 300,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.guarContractNo) {
                  return new Error("请输入担保合同编号")
                }
              },
            },
            path: "guarContractNo",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入担保合同编号",
                  value: row.guarContractNo,
                  "on-update:value"(e: any) {
                    row.guarContractNo = e
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

export default BankGuarantee
