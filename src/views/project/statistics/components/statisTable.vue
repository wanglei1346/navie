<template>
  <div class="staticTable">
    <div style="text-align:right;">
      <!-- <n-button quaternary type="info" @click="downloadTable">
        下载表格
      </n-button> -->
    </div>
    <n-tabs type="line" animated v-model:value="tabName">
      <!-- <n-tab-pane name="10" tab="全部"></n-tab-pane> -->
      <n-tab-pane name="11" tab="待发函证"></n-tab-pane>
      <n-tab-pane name="12" tab="已发函证"></n-tab-pane>
      <n-tab-pane name="13" tab="已回函证"></n-tab-pane>
      <!-- <n-tab-pane name="14" tab="不符函证"></n-tab-pane>
      <n-tab-pane name="15" tab="相符函证"></n-tab-pane> -->
    </n-tabs>
    <QueryForm :formOption="tabName == '11'?formOption:tabName == '12'?formOption1:[]" @query="query" ref="queryForm" v-if="tabName!='13'"/>
    <!-- <IndexButton :tab-name="tabName" :checked-row-keys="checkedRowKeys" /> -->
    <DataTable
      :loading="loading"
      :row-key="rowKey"
      :columns="columns"
      :page="pageIndex"
      :data="data"
      :count="totalCount"
      :checkedRowKeys="checkedRowKeys"
      @handleCheck="handleCheck"
      @handlePage="handlePage"
      @handlePageSize="handlePageSize"
    />
    <n-button type="primary" @click="batchExport"  style="margin:0px 20px;" :disabled="checkedRowKeys.length == 0">批量导出</n-button>
    <n-button type="primary" @click="downloadLetter"  style="margin:0px 20px;" :disabled="checkedRowKeys.length == 0" v-if="tabName == '13'">下载函证</n-button>
  </div>
</template>
<script lang="ts" setup>
import { nextTick, ref, watch,h,reactive,toRefs } from "vue"
import { DataTableRowKey, NButton,NSpace } from "naive-ui"
import Project from '@/api/project'
import download from "@/utils/download"
import {useRouter} from "vue-router"
import { tableColumns } from "./index"
const loading = ref(false)
const router = useRouter()
// import IndexButton from "./components/IndexButton.vue"

const props = defineProps({
  tab:{
    type:String
  },
  prjId:{
    type:String
  },
})
// watch(props,(newProps,oldProps)=>{
//   console.log(newProps,'newProps')
//   // 调用接口
// })
// 传递值 active
const send = () => {}

// 表格多选key
const rowKey = (row: any) => row.confId
// 搜索框
const queryForm = ref()
// 多选框value
const checkedRowKeys = ref<Array<string | number>>([])
// 表格数据
const state = reactive({
  pageIndex:1,
  data:<any>[],
  queryForm:{},
  pageSize:10,
  totalCount:0,
  tabName:'11',
  formOption:[
    {
      label:'函证编号',
      key:'confNo',
      type:'input',
      placeholder: "请输入函证编号",
    },
    {
      label:'授权单位',
      key:'confAuthorizerCompany',
      type:'input',
      placeholder: "请输入授权单位",
    },
    {
      label:'回函单位',
      key:'confReplyerCompany',
      type:'input',
      placeholder: "请输入回函单位",
    },
    // {
    //   label: "函证状态",
    //   key: "confState",
    //   type: "select",
    //   placeholder: "请选择函证状态",
    //   options: [],
    // },
    // {
    //   label: "函证类型",//银行函证
    //   key: "confType",
    //   type: "select",
    //   placeholder: "请选择函证类型",
    //   options: [
    //     {
    //       label: "银行函证",
    //       value: 1,
    //     },
        
    //   ],
    // },
    // {
    //   label: "函证状态",
    //   key: "confState",
    //   type: "select",
    //   placeholder: "请选择函证状态",
    //   options: [],
    // },
    // {
    //   label: "发函时间",
    //   key: "confSendStartDate$confSendEndDate",
    //   type: "daterange",
    //   placeholder: "请选择发函时间",
      
    // },
    // {
    //   label: "回函时间",
    //   key: "confReplyStartDate$confReplyEndDate",
    //   type: "daterange",
    //   placeholder: "请选择回函时间",
    // },
  ],
  formOption1:[
    {
      label: "函证状态",
      key: "confState",
      type: "select",
      placeholder: "请选择函证状态",
      options: [],
    },
  ]
})
const {pageIndex,data,totalCount,tabName,formOption,formOption1} = toRefs(state)

// tab标签页Name
watch(
  () => state.tabName,
  (newvalue, oldvalue) => {
    state.tabName = newvalue
    getTableList()
    statusList()
  },{
    deep: true
  }
);

// 多选回调
const handleCheck = (checkValue: DataTableRowKey[]) => {
  checkedRowKeys.value = checkValue
  console.log(checkedRowKeys.value,'checkedRowKeys.value')
}

// 页码回调
const handlePage = (page: number) => {
  state.pageIndex = page
  getTableList()
}

// 页条回调
const handlePageSize = (pageSize: number) => {
  state.pageSize = pageSize
  getTableList()
}

// 查询
const query = (_form: any) => {
  state.pageIndex=1
  state.queryForm = _form
  getTableList()
}

// 查询表单配置
// const formOption: Components.IFormOption[] = [
//   {
//     label:'函证编号',
//     key:'confNo',
//     type:'input',
//     placeholder: "请输入函证编号",
//   },
//   {
//     label: "函证类型",//银行函证
//     key: "confType",
//     type: "select",
//     placeholder: "请选择函证类型",
//     options: [
//       {
//         label: "银行函证",
//         value: 1,
//       },
      
//     ],
//   },
//   {
//     label: "函证状态",
//     key: "confState",
//     type: "select",
//     placeholder: "请选择函证状态",
//     options: [],
//   },
//   {
//     label: "发函时间",
//     key: "confSendStartDate$confSendEndDate",
//     type: "daterange",
//     placeholder: "请选择发函时间",
    
//   },
//   {
//     label: "回函时间",
//     key: "confReplyStartDate$confReplyEndDate",
//     type: "daterange",
//     placeholder: "请选择回函时间",
//   },
// ]
const confTypes = [
  {
    label: "银行函证",
    value: 1,
  },
  {
    label: "往来函证",
    value: 2,
  },
  {
    label: "自定义函证",
    value: 3,
  },
]

const confStates = [
  {
    label: "草稿",
    value: "1",
  },
  {
    label: "待发函",
    value: "2",
  },
]

const columns = [
    {
      type: "selection",
    },
    {
      title: "函证编码",
      key: "confNo",
      render:(row:any)=> {
        return h(NButton,{
          size: "small",
          type: "info",
          quaternary:true,
          onClick:()=>checkDetail(row)
        },{
          default:()=>row.project
        })
      }
    },
    {
      title: "所属项目",
      key: "prjName",
    },
    {
      title: "函证类型",
      key: "confTypeName",
      render(row: any) {
        return confTypes.find((type: any) => type.value === row.confType)?.label
      },
    },
    {
      title: "函证状态",
      key: "confStateName",
      render(row: any) {
            return confStates.find(
              (state: any) => state.value === row.confState
            )?.label
          },
    },
    {
      title: "授权单位",
      key: "confAuthorizerCompany",
    },
    {
      title: "回函单位",
      key: "confReplyerCompany",
    },
    {
      title: "发函时间",
      key: "confSendDate",
    },
    {
      title: "授权时间",
      key: "confAuthorizeDate",
    },
    {
      title: "回函时间",
      key: "confReplyDate",
    },
    {
      title: "操作",
      key: "tags",
      render(row: any) {
        return h(NSpace,{},()=>[
          h(NButton,{
            size: "small",
            type: "info",
            quaternary:true,
            onClick:()=>checkDetail(row)
          },{
            default:()=>"查看"
          }),
          state.tabName ==='13'?
          h(NButton,{
              size: "small",
              type: "info",
              quaternary:true,
              onClick:()=>downloadRow()
          },{
            default:()=>"下载"
          }):null,
        ])
      }
    },
  ]

// 表格
const getTableList = async ()=>{
  const obj ={
    ...state.queryForm,
    pageSize:state.pageSize,
    pageIndex:state.pageIndex,
    prjId:props.prjId,
    // prjId:'794279772329869312',
    confType: 1,//银行函证
    analysisType: state.tabName
    // analysisType: 11
  }
  const {data:{data,success,totalCount}}= await Project.summaryList(obj)
  loading.value = true
  if(success){
      loading.value = false
      state.data = data;
      state.totalCount =totalCount 
  }
}
getTableList()

// 根据tabName匹配对应表格头,调用对应接口
watch(tabName, (newvalue) => {
  checkedRowKeys.value.length = 0
  nextTick(() => {
    if(newvalue != '13'){
      queryForm.value.resetFields()
    }
  })
})

// // 下载表格
// const downloadTable = ()=>{
//   const obj ={
//     ...state.queryForm,
//     pageSize:state.pageSize,
//     pageIndex:state.pageIndex,
//     prjId:props.prjId,
//     confType: 1,//银行函证
//     analysisType: state.tabName
//   }
//   download("conf-analysis/excel-download", obj, "post")
// }

// 获取函证状态下拉
const statusList = async ()=>{
  let obj ={
    confType:1,
    analysisType:Number(state.tabName)
  }
  const {data:{data,success}} = await Project.confStates(obj)
  if(success){
    if(data){
      let list = data.map((i:any)=>{
        return {
          label:i.name,
          value:i.code
        }
      })
      state.formOption1[0].options = list
    }else{
      state.formOption1[0].options = []
    }
  }
}
statusList()

// 下载单条数据
const downloadRow = ()=>{

}
// 批量导出
const batchExport = ()=>{
  download("conf-analysis/excel-download", {confIds:checkedRowKeys.value}, "post")
}
// 下载函证
const downloadLetter = ()=>{
  download("conf-analysis/replyFile-batch-download", {confIds:checkedRowKeys.value}, "post")
}
const checkDetail = (row:any)=>{
  router.push(`/proof/send/show/${row.confId}`)
}
</script>
<style lang="scss" scoped>
.staticTable{
  padding:20px;
}
</style>
