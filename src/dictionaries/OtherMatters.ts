import { h } from "vue"
import { NInput, NFormItem } from "naive-ui"
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-11-01 15:53:11
 * @description 其他事项配置项
 */
const OtherMatters = {
  title: "其他事项",
  active: 1,
  columns: [
    {
      title: "其他事项",
      key: "othmContent",
      render(row: any, index: number) {
        return h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (!row.othmContent) {
                  return new Error("请输入其他事项")
                }
              },
            },
            path: "othmContent",
          },
          {
            default: () =>
              h(
                NInput,
                {
                  type: "textarea",
                  autosize: { minRows: 1, maxRows: 5 },
                  placeholder: "请输入其他事项",
                  value: row.othmContent,
                  showCount: !!row.othmContent,
                  "on-update:value"(e: any) {
                    row.othmContent = e
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

export default OtherMatters
