<template>
  <n-card
    :bordered="false"
    header-style="padding:10px 0"
    content-style="padding:0"
  >
    <template #header>
      <n-space align="center">
        <!-- appendixCOList -->
        {{ (index + 1 == length ? "附录：" : index + 1 + ".") + option.title }}
        <n-switch
          :checked-value="1"
          :unchecked-value="0"
          v-model:value="option.active"
          v-if="type != 'show'"
        />
        <span v-show="!option.active" class="switch-title">不问询当前业务</span>
      </n-space>
    </template>
    <n-form ref="dataTable" :rules="rules">
      <DataTable
        v-show="option.active"
        :columns="columns"
        :max-height="250"
        :data="option[option.key]"
        table-layout="fixed"
        :scroll-x="0"
        :has-pagination="false"
        :loading="false"
      />
    </n-form>
  </n-card>
</template>
<script lang="ts" setup>
import { h, ref } from "vue"
import { NButton, NSpace, NPopconfirm } from "naive-ui"
const columns: any[] = []
const dataTable = ref()
const accountName = ref()
const basicColumns = [
  {
    title: "操作",
    key: "tags",
    width: 180,
    fixed: "left",
    render(row: any, index: number) {
      return h(
        NSpace,
        {},
        {
          default: () => [
            h(
              NPopconfirm,
              {
                onPositiveClick: () => delet(index),
              },
              {
                trigger: () =>
                  h(
                    NButton,
                    {
                      secondary: true,
                      type: "error",
                      style:
                        props.option[props.option.key].length == 1
                          ? "display:none"
                          : "",
                    },
                    { default: () => "删除" }
                  ),
                default: () => "是否确定将此数据删除",
              }
            ),
            h(
              NButton,
              {
                secondary: true,
                type: "info",
                style:
                  index == props.option[props.option.key].length - 1
                    ? ""
                    : "display:none",
                onClick: () => add(),
              },
              { default: () => "添加" }
            ),
          ],
        }
      )
    },
  },
]
const rules = {}
const validateForm = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await dataTable.value.validate()
      resolve(true)
    } catch {
      resolve(false)
    }
  })
}
const restoreValidationForm = () => {
  dataTable.value.restoreValidation()
}
const add = async () => {
  try {
    await dataTable.value.validate()
    const params = {}
    for (let column of props.option.columns) {
      params[column.key] = null
    }
    props.option[props.option.key].push(params)
  } catch {}
}
const replenish = () => {
  if (props.option[props.option.key].length === 0) {
    const params = {}
    for (let column of props.option.columns) {
      params[column.key] = null
    }
    props.option[props.option.key].push(params)
  }
}
const delet = (index: number) => {
  props.option[props.option.key].splice(index, 1)
}

type IOption = {
  active: number
  columns: any[]
  title: string
  key: string
}

type IProp = {
  option: IOption
  index: number
  type: string
  length: number
}

const props = defineProps<IProp>()

if (props.type === "show") {
  columns.push(...props.option.columns)
} else if (props.type === "edit") {
  columns.push(...basicColumns, ...props.option.columns)
  replenish()
} else {
  columns.push(...basicColumns, ...props.option.columns)
  add()
}
defineExpose({ validateForm, restoreValidationForm })
</script>
<style lang="scss" scoped>
:deep(.n-card-header__main) {
  width: 100%;
  .switch-title {
    font-size: 14px;
    color: rgb(167, 40, 61);
  }
}
</style>
