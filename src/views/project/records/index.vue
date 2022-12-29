<template>
  <div>
    <QueryForm :formOption="formOption" @query="query" />
    <DataTable
      :loading="loading"
      :row-key="rowKey"
      :columns="columns"
      :data="list"
      :count="totalCount"
      @handleCheck="handleCheck"
      @handlePage="handlePage"
      @handlePageSize="handlePageSize"
    />
  </div>
</template>
<script lang="ts" setup>
import { h, reactive, ref, watchEffect,toRefs } from "vue"
import { DataTableRowKey, NButton, NSpace, NPopconfirm } from "naive-ui"
import {useRouter} from "vue-router"
import Project from '@/api/project'
const loading = ref(false)
const router = useRouter()
// import

// 表格多选key
const rowKey = (row: any) => row.id
// 清空数组null
// const removeEmptyArray = (array: any[]) => {
//   return array.filter((item) => item)
// }
const model = reactive({
  inputValue: "",
})
// 表格头配置
const columns = ref<any[]>([])

const state = reactive({
  formTime:{
    startDate:'',
    endDate:''
  },
  list:[],
  pageIndex:1,
  pageSize:10,
  totalCount:0,
})
const {list,totalCount} = toRefs(state)

/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-10-26 20:00:55
 * @description 函证查看
 */
const examine = async (row: any) => {
  const {data:{data,success}}= await Project.selectImportRecordById (row.id)
  if(success){
      router.push(`/proof/send/show/${data}`)
  } 
}

// 多选回调
const handleCheck = (checkValue: DataTableRowKey[]) => {
  console.log(checkValue)
}

// 页码回调
const handlePage = (page: number) => {
  state.pageIndex = page
  selectAllProject()
}

// 页条回调
const handlePageSize = (pageSize: number) => {
  state.pageSize = pageSize
  selectAllProject()
}

// 查询
const query = (_form: any) => {
  state.formTime = _form;
  state.pageIndex = 1
  selectAllProject()
}

// 查询表单配置
const formOption: Components.IFormOption[] = [
  {
    label: "导入时间",
    type: "daterange",
    key: "startTime$endTime",
  },
]

// 根据tabName匹配对应表格头,调用对应接口
watchEffect(() => {
  columns.value = ([
    {
      type: "selection",
    },
    {
      title: "导入文件名称",
      key: "importFileName",
    },
    {
      title: "导入任务编号",
      key: "importTaskNo",
    },
    {
      title: "导入时间",
      key: "importDate",
    },
    {
      title: "导入人员",
      key: "importUserId",
    },
    {
      title: "导入数量",
      key: "importCount",
    },
    {
      title: "成功导入",
      key: "importSuccessCount",
    },
    {
      title: "导入失败",
      key: "importFailCount",
    },
    {
      title: "操作",
      key: "tags",
      render(row: any) {
        return h(NSpace, {}, () =>
          ([
            // row.fail >8?
            //   h(NButton,{
            //     size: "small",
            //       text: true,
            //       type: "info",
            //       onClick: () => download(row),
            //   },{
            //     default:()=>'下载失败记录'
            //   }):
              h(NButton,
              {
                size: "small",
                text: true,
                type: "info",
                onClick: () => examine(row),
              },
              { default: () => "查看" }
            ),
          ])
        )
      },
    },
  ])
})

// 导入列表
const selectAllProject = async()=>{
  loading.value = true
  const obj={
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
      ...state.formTime
    }
  const {data:{data,success,totalCount}}= await Project.selectAllImportRecord(obj)
  if(success){
    loading.value = false
      state.list = data;
      state.totalCount =totalCount 
  } 
}
selectAllProject()
// const download = (row:any)=>{
//   console.log(row)
// }
</script>
<style lang="scss" scoped></style>
