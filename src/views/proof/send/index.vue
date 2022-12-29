<template>
  <div>
    <n-tabs type="line" animated v-model:value="tabName">
      <n-tab-pane name="wait" tab="待发函证"></n-tab-pane>
      <n-tab-pane name="send" tab="已发函证"></n-tab-pane>
      <n-tab-pane name="invalidate" tab="作废函证"></n-tab-pane>
    </n-tabs>
    <QueryForm :formOption="formOption" @query="query" ref="queryForm" />
    <IndexButton
      :tab-name="tabName"
      :getList="getList"
      :checked-row-keys="checkedRowKeys"
    />
    <DataTable
      :loading="loading"
      :row-key="rowKey"
      :columns="columns"
      :data="tableData"
      :count="count"
      :page="tableListConfig.pageIndex"
      :checkedRowKeys="checkedRowKeys"
      @handleCheck="handleCheck"
      @handlePage="handlePage"
      @handlePageSize="handlePageSize"
    />
  </div>
</template>
<script lang="ts" setup>
import { nextTick, reactive, ref, watch } from "vue"
import { DataTableRowKey } from "naive-ui"
import { tableColumns, getFormOption } from "./index"
import IndexButton from "./components/IndexButton.vue"
import Proof from "@/api/proof"
// tab标签页Name
const tabName = ref("wait")
// 表格多选key
const rowKey = (row: any) => row.confId
// 表格头配置
const columns = ref<any[]>()
// 搜索框
const queryForm = ref()
// 多选框value
const checkedRowKeys = ref<Array<string | number>>([])
// 表格数据
const tableData = ref()
// 表格加载
const loading = ref(false)
// 查询条件
const tableListConfig = reactive({
  pageSize: 10,
  pageIndex: 1,
  confAuthorizerCompany: "",
  confState: "",
  confSubject: "",
  confType: "",
  analysisType: 11,
})
// 函证状态
const confStates = ref([])
const count = ref()
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-12-09 17:39:07
 * @description 获取列表数据
 */
const getList = async () => {
  loading.value = true
  const {
    data: { data, totalCount },
  } = await Proof.list(tableListConfig)
  loading.value = false
  tableData.value = data
  count.value = totalCount
}
// 多选回调
const handleCheck = (checkValue: DataTableRowKey[]) => {
  checkedRowKeys.value = checkValue
}

// 页码回调
const handlePage = (page: number) => {
  console.log("page", page)
  tableListConfig.pageIndex = page
  getList()
}

// 页条回调
const handlePageSize = (pageSize: number) => {
  tableListConfig.pageSize = pageSize
  getList()
}

// 查询
const query = (_form: any) => {
  tableListConfig.pageIndex = 1
  for (let key in tableListConfig) {
    if (
      !_form[key] &&
      key !== "pageSize" &&
      key !== "pageIndex" &&
      key !== "analysisType"
    ) {
      tableListConfig[key] = ""
    } else if (_form[key]) {
      tableListConfig[key] = _form[key]
    }
  }
  getList()
}

/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-12-20 17:00:33
 * @description 获取函证状态
 */
const getConfStates = async () => {
  const {
    data: { data },
  } = await Proof.getConfStates({
    analysisType: tableListConfig.analysisType,
    confType: 1,
  })
  confStates.value = data?.map((item: any) => ({
    value: item.code,
    label: item.name,
  }))
}

const formOption: any = ref([])

// 根据tabName匹配对应表格头,调用对应接口
watch(
  tabName,
  async () => {
    nextTick(() => {
      queryForm.value.resetFields()
    })
    switch (tabName.value) {
      case "wait":
        tableListConfig.analysisType = 11
        break
      case "send":
        tableListConfig.analysisType = 12
        break
      case "invalidate":
        tableListConfig.analysisType = 16
        break
    }
    tableListConfig.pageIndex = 1
    tableListConfig.confAuthorizerCompany = ""
    tableListConfig.confState = ""
    tableListConfig.confSubject = ""
    tableListConfig.confType = ""
    await getConfStates()
    columns.value = tableColumns(tabName.value, getList, confStates.value)
    formOption.value = getFormOption(confStates.value, tabName.value)
    checkedRowKeys.value.length = 0
    getList()
  },
  {
    immediate: true,
  }
)
</script>
<style lang="scss" scoped></style>
