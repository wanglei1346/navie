import { h } from "vue"
import { NInput, NSelect, NInputNumber, NDatePicker, NFormItem } from "naive-ui"
import { currencys, fxcTypes } from "./dictionaries"
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-11-01 15:37:09
 * @description 本公司与贵行之间未履行完毕的外汇买卖合约配置项
 */
const ForeignTradingContract = {
  title: "本公司与贵行之间未履行完毕的外汇买卖合约",
  active: 1,
  columns: [
    {
      title: "类别",
      key: "fxcType",
      width: 300,
      fixed: "left",
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.fxcType && row.fxcType !== 0) {
                  return new Error("请选择类别")
                }
              },
            },
            path: "fxcType",
          },
          {
            default: () =>
              h(
                NSelect,
                {
                  placeholder: "请选择类别",
                  options: fxcTypes,
                  value: row.fxcType,
                  "on-update:value"(e: any) {
                    row.fxcType = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "合约号码",
      key: "contractNo",
      width: 300,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.contractNo) {
                  return new Error("请输入合约号码")
                }
              },
            },
            path: "contractNo",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入合约号码",
                  value: row.contractNo,
                  "on-update:value"(e: any) {
                    row.contractNo = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "银行卖出币种",
      key: "bankSellingCurrency",
      width: 300,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.bankSellingCurrency && row.bankSellingCurrency !== 0) {
                  return new Error("请选择币种")
                }
              },
            },
            path: "bankSellingCurrency",
          },
          {
            default: () =>
              h(
                NSelect,
                {
                  placeholder: "请选择币种",
                  options: currencys,
                  value: row.bankSellingCurrency,
                  "on-update:value"(e: any) {
                    row.bankSellingCurrency = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "银行买入币种",
      key: "bankBuyingCurrency",
      width: 300,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.bankBuyingCurrency && row.bankBuyingCurrency !== 0) {
                  return new Error("请选择币种")
                }
              },
            },
            path: "bankBuyingCurrency",
          },
          {
            default: () =>
              h(
                NSelect,
                {
                  placeholder: "请选择币种",
                  options: currencys,
                  value: row.bankBuyingCurrency,
                  "on-update:value"(e: any) {
                    row.bankBuyingCurrency = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "未履行的合约买卖金额",
      key: "failTradeAmount",
      width: 210,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.failTradeAmount) {
                  return new Error("请输入未履行的合约买卖金额")
                }
              },
            },
            path: "failTradeAmount",
          },
          {
            default: () =>
              h(
                NInputNumber,
                {
                  precision: 2,
                  showButton: false,
                  placeholder: "请输入未履行的合约买卖金额",
                  value: row.failTradeAmount,
                  "on-update:value"(e: any) {
                    row.failTradeAmount = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "汇率",
      key: "exchangeRate",
      width: 150,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.exchangeRate && row.exchangeRate !== 0) {
                  return new Error("请输入汇率")
                }
              },
            },
            path: "exchangeRate",
          },
          {
            default: () =>
              h(
                NInputNumber,
                {
                  showButton: false,
                  precision: 2,
                  placeholder: "请输入汇率",
                  value: row.exchangeRate,
                  "on-update:value"(e: any) {
                    row.exchangeRate = e
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
      title: "交收日期",
      key: "handoverDate",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "change"],
              validator() {
                if (!row.handoverDate) {
                  return new Error("请选择交收日期")
                }
              },
            },
            path: "handoverDate",
          },
          {
            default: () =>
              h(
                NDatePicker,
                {
                  valueFormat: "yyyy-MM-dd",
                  "value:formatted-value": row.handoverDate,
                  "on-update:formatted-value"(e: any) {
                    row.handoverDate = e
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

export default ForeignTradingContract
