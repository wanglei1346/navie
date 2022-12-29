import { h } from "vue"
import { NInput, NSelect, NInputNumber, NFormItem } from "naive-ui"
import { currencys } from "./dictionaries"
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-11-01 11:46:26
 * @description 资金归集(资金池或其他资金管理)账户具体信息配置项
 */
const FundCollection = {
  title: "资金归集(资金池或其他资金管理)账户具体信息",
  active: 1,
  columns: [
    {
      title: "资金提供机构名称（即拨入资金的具体机构）",
      key: "fundProviderName",
      width: 300,
      fixed: "left",
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.fundProviderName) {
                  return new Error("请输入资金提供机构名称")
                }
              },
            },
            path: "fundProviderName",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入资金提供机构名称",
                  value: row.fundProviderName,
                  "on-update:value"(e: any) {
                    row.fundProviderName = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "资金提供机构账号",
      key: "fundProviderAccount",
      width: 300,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.fundProviderAccount) {
                  return new Error("请输入资金提供机构账号")
                }
              },
            },
            path: "fundProviderAccount",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入资金提供机构账号",
                  allowInput: (value: string) => !value || /^\d+$/.test(value),
                  value: row.fundProviderAccount,
                  "on-update:value"(e: any) {
                    row.fundProviderAccount = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "资金使用机构名称（即问该具体机构拨出资金）",
      key: "fundUsingInstitutionsName",
      width: 300,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.fundUsingInstitutionsName) {
                  return new Error("请输入资金使用机构名称")
                }
              },
            },
            path: "fundUsingInstitutionsName",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入资金使用机构名称",
                  value: row.fundUsingInstitutionsName,
                  "on-update:value"(e: any) {
                    row.fundUsingInstitutionsName = e
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
      title: "截止函证基准日拨入或拨出金额",
      key: "amountUsed",
      width: 150,
      render(row: any) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.amountUsed && row.amountUsed !== 0) {
                  return new Error("请输入金额")
                }
              },
            },
            path: "amountUsed",
          },
          {
            default: () =>
              h(NInputNumber, {
                showButton: false,
                precision: 2,
                placeholder: "请输入金额",
                value: row.amountUsed,
                "on-update:value"(e: any) {
                  row.amountUsed = e
                },
              }),
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
                  autosize: { minRows: 1, maxRows: 5 },
                  showCount: !!row.remark,
                  value: row.remark,
                  placeholder: "请输入备注",
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

export default FundCollection
