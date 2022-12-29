import { h } from "vue"
import { NInput, NSelect, NInputNumber, NFormItem } from "naive-ui"
import { currencys } from "./dictionaries"
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-11-01 15:45:13
 * @description 本公司存放于贵行托管的有价证券或其他产权文件配置项
 */
const PropertyDocument = {
  title: "本公司存放于贵行托管的有价证券或其他产权文件",
  active: 1,
  columns: [
    {
      title: "证券或其他产权文件名称",
      key: "pdocName",
      width: 300,
      fixed: "left",
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.pdocName) {
                  return new Error("请输入证券或其他产权文件名称")
                }
              },
            },
            path: "pdocName",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入证券或其他产权文件名称",
                  value: row.pdocName,
                  "on-update:value"(e: any) {
                    row.pdocName = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "证券代码或产权文件编号",
      key: "pdocNo",
      width: 300,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.pdocNo) {
                  return new Error("请输入证券代码或产权文件编号")
                }
              },
            },
            path: "pdocNo",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  placeholder: "请输入证券代码或产权文件编号",
                  value: row.pdocNo,
                  "on-update:value"(e: any) {
                    row.pdocNo = e
                  },
                },
                {}
              ),
          }
        )
      },
    },
    {
      title: "数量",
      key: "quantity",
      width: 150,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.quantity && row.quantity !== 0) {
                  return new Error("请输入数量")
                }
              },
            },
            path: "quantity",
          },
          {
            default: () =>
              h(NInputNumber, {
                showButton: false,
                min: 0,
                placeholder: "请输入数量",
                value: row.quantity,
                "on-update:value"(e: any) {
                  row.quantity = e
                },
              }),
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
      title: "金额",
      key: "amount",
      width: 150,
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.amount && row.amount !== 0) {
                  return new Error("请输入金额")
                }
              },
            },
            path: "amount",
          },
          {
            default: () =>
              h(
                NInputNumber,
                {
                  precision: 2,
                  showButton: false,
                  placeholder: "请输入余额",
                  value: row.amount,
                  "on-update:value"(e: any) {
                    row.amount = e
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

export default PropertyDocument
