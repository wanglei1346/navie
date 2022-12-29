<template>
  <div>
    <n-data-table
      v-bind="$attrs"
      :columns="columns"
      :data="data"
      @update:checked-row-keys="handleCheck"
      :checked-row-keys="checkedRowKeys"
      :loading="loading"
    />
    <n-pagination
      v-if="hasPagination"
      :default-page="1"
      v-model:page="page"
      :item-count="count"
      show-quick-jumper
      @update:page="handlePage"
      @update:page-size="handlePageSize"
      show-size-picker
      :display-order="['size-picker', 'pages', 'quick-jumper']"
      :page-sizes="[10, 20, 30, 40]"
    >
      <template #prefix="{ itemCount }"> 共 {{ itemCount }} 项数据 </template>
    </n-pagination>
  </div>
</template>
<script lang="ts" setup>
import type { DataTableColumns, DataTableRowKey } from "naive-ui"
import { watch } from "vue"
const emit = defineEmits(["handleCheck", "handlePage", "handlePageSize"])
const handleCheck = (rowKeys: DataTableRowKey[]) => {
  emit("handleCheck", rowKeys)
}
const handlePage = (page: number) => {
  console.log("emitPage")
  emit("handlePage", page)
}
const handlePageSize = (pageSize: number) => {
  emit("handlePageSize", pageSize)
}
type IProps = {
  data: any[]
  columns: DataTableColumns[]
  count?: number
  checkedRowKeys?: Array<number | string>
  hasPagination?: boolean
  page?: number
}

const props = defineProps({
  data: Array,
  columns: Array,
  count: {
    type: Number,
    required: false,
  },
  page: {
    type: Number,
    required: false,
  },
  checkedRowKeys: {
    type: Array,
    required: false,
  },
  hasPagination: {
    type: Boolean,
    default: true,
    required: false,
  },
  loading: {
    type: Boolean,
    default: false,
    required: true,
  },
})
watch(
  () => props.columns,
  (columns) => {
    columns?.forEach((column: any) => {
      if (!column.render) {
        column.ellipsis = {
          tooltip: {
            "content-style": {
              "max-width": "700px",
            },
          },
        }
      }
    })
  },
  {
    immediate: true,
  }
)
</script>
<style lang="scss" scoped>
:deep(.n-pagination) {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  .n-pagination-prefix {
    flex: 1;
  }
}
</style>
