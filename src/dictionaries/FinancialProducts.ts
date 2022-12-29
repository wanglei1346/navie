import { h } from "vue"
import { NInput, NSelect, NInputNumber, NDatePicker, NFormItem } from "naive-ui"
import { currencys, finpTypes } from "./dictionaries"
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-11-01 15:48:45
 * @description 本公司购买的由贵行发行的未到期银行理财产品配置项
 */
const FinancialProducts = {
  title: "本公司购买的由贵行发行的未到期银行理财产品",
  active: 1,
  columns: [
    {
      title: "产品名称",
      key: "finpName",
      width: 300,
      fixed: "left",
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.finpName) {
                  return new Error("请输入产品名称")
                }
              },
            },
            path: "finpName",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入产品名称",
                  value: row.finpName,
                  "on-update:value"(e: any) {
                    row.finpName = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "产品类型",
      key: "finpType",
      width: 300,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.finpType && row.finpType !== 0) {
                  return new Error("请选择产品类型")
                }
              },
            },
            path: "finpType",
          },
          {
            default: () =>
              h(
                NSelect,
                {
                  placeholder: "请选择产品类型",
                  options: finpTypes,
                  value: row.finpType,
                  "on-update:value"(e: any) {
                    row.finpType = e
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
      render(row: any, index: number) {
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
      title: "持有份额",
      key: "sharesHeld",
      width: 150,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.sharesHeld && row.sharesHeld !== 0) {
                  return new Error("请输入持有份额")
                }
              },
            },
            path: "sharesHeld",
          },
          {
            default: () =>
              h(
                NInputNumber,
                {
                  showButton: false,
                  precision: 2,
                  placeholder: "请输入持有份额",
                  value: row.sharesHeld,
                  "on-update:value"(e: any) {
                    row.sharesHeld = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "产品净值",
      key: "netProductValue",
      width: 150,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.netProductValue && row.netProductValue !== 0) {
                  return new Error("请输入产品净值")
                }
              },
            },
            path: "netProductValue",
          },
          {
            default: () =>
              h(
                NInputNumber,
                {
                  showButton: false,
                  precision: 2,
                  placeholder: "请输入产品净值",
                  value: row.netProductValue,
                  "on-update:value"(e: any) {
                    row.netProductValue = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "购买日",
      key: "purchaseDate",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.purchaseDate) {
                  return new Error("请选择购买日")
                }
              },
            },
            path: "purchaseDate",
          },
          {
            default: () =>
              h(
                NDatePicker,
                {
                  valueFormat: "yyyy-MM-dd",
                  "value:formatted-value": row.purchaseDate,
                  "on-update:formatted-value"(e: any) {
                    row.purchaseDate = e
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
      title: "是否被用于担保或存在其他使用限制",
      key: "isUseLimit",
      width: 300,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.isUseLimit) {
                  return new Error("请输入是否被用于担保或存在其他使用限制")
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
                  placeholder: "请输入是否被用于担保或存在其他使用限制",
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
  ],
}

export default FinancialProducts
