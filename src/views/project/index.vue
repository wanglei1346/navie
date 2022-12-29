<template>
  <div>
    <QueryForm :formOption="formOption" @query="query"></QueryForm>
    <n-button type="info" @click="createProject" style="margin-bottom:30px;">
      创建项目
    </n-button>
    <DataTable
      :loading="loading"
      :row-key="rowKey"
      :columns="columns"
      :data="list"
      :page="pageIndex"
      :count="totalCount"
      @handlePage="handlePage"
      @handlePageSize="handlePageSize"
    />
  </div>
</template>
<script setup lang="ts">
import Table from './components/table.vue'
import {toRefs,reactive,h,ref} from "vue"
import {useRouter} from "vue-router"
import { DataTableRowKey, NButton, NSpace, NPopconfirm } from "naive-ui"
import Project from '@/api/project'
const router = useRouter()
const loading = ref(false)

const formOption: Components.IFormOption[] = [
  {
    label:'项目名称/编码',
    key:'searchKey',
    type:'input',
    placeholder:'请输入项目名称/编码'
  },
  {
    label: "发行人名称",
    key:'issrName',
    type:'input',
    placeholder:'请输入发行人名称'
  },
  {
    label: "时间范围",
    type: "daterange",
    key: "startTime$endTime",
  },
]

const rowKey = (row: any) => row.code

const state = reactive({
  pageIndex:1,
  pageSize:10,
  totalCount:0,
  columns:[
    {
        title: '序号',
        key: 'code',
        render:(row:any,index:any)=>{
          return (state.pageIndex - 1) * state.pageSize + index + 1
        },
        // width: 80,
        // render(row:any,index:number){
        //   return  (state.pageIndex - 1) * state.pageSize + index + 1
        // }
      },
      {
        title: '项目名称',
        key: 'prjName',
      },
      {
        title: '项目编码',
        key: 'prjNo'
      },
      {
        title: '发行人名称',
        key: 'issrName'
      },
      {
        title: '创建时间',
        key: 'createDate'
      },
      {
        title: '操作',
        key: 'actions',
        width: 350,
        render(row: any) {
          return h(NSpace, {}, () => [
            h(
                NButton,
                {
                  quaternary:true,
                  size: 'small',
                  type:'info',
                  text:true,
                  onClick: () => CreateLetter(row)
                },
                { default: () => '创建函证' },
              ),
            //   h(
            //   NButton,
            //   {
            //     quaternary:true,
            //     size: 'small',
            //     type:'info',
            //     text:true,
            //     onClick: () => downloadRecord(row)
            //   },
            //   { default: () => '导入记录' },
              
            // ),
            h(
              NButton,
              {
                quaternary:true,
                size: 'small',
                type:'info',
                text:true,
                onClick: () => CorrespondenceStatistics(row)
              },
              { default: () => '函证统计' },
              
            ),
            h(
              NButton,
              {
                quaternary:true,
                size: 'small',
                type:'info',
                text:true,
                onClick: () => detailLetter(row)
              },
              { default: () => '查看' },
              
            ),
            h(
              NButton,
              {
                quaternary:true,
                size: 'small',
                type:'info',
                text:true,
                onClick: () => editLetter(row)
              },
              { default: () => '编辑' },
              
            ),
            h(
              NPopconfirm,
              {
                onPositiveClick: () => invalidate(row),
              },
              {
                default:()=>"确定要删除吗？",
                trigger: () =>
                    h(
                      NButton,
                      {
                        size: "small",
                        type: "info",
                        quaternary:true,
                        text:true,
                      },
                      { default: () => "删除" }
                    ),
              }
            )
          ])
      },
    },
  ],
  searchOption:{
    startTime:'',
    searchKey:'',
    endTime:'',
    issrName:''
  },
  list:[]
})
const {columns,list,totalCount,pageIndex} = toRefs(state)

// 删除
const invalidate = async (row:any)=>{
  const {data:{success}} = await Project.deleteProject(row.prjId)
  if(success){
    window.$message.success("操作成功")
    // message.success('操作成功')
  }
}
// 搜索
const query = (_form: any) => {
  state.searchOption = _form
  state.pageIndex=1
  selectAllProject()
}

// 创建项目
const createProject = ()=>{
  router.push({
    path:'/createProject',
    query:{
      type:'add'
    }
  })
}
// 创建函证
const CreateLetter = (param:any)=>{
  router.push({
    path:'/createLetter',
    query:{
      prjId:param.prjId,
      prjName:param.prjName,
      prjNo:param.prjNo
    }
  })
}
// 导入记录
const downloadRecord = (param:any)=>{
  router.push('/ImportRecords')
}
// 函证统计
const CorrespondenceStatistics = (param:any)=>{
  router.push({
    path:'/statistics',
    query:{
      prjId:param.prjId
    }
  })
}
// 查看
const detailLetter = (param:any)=>{
  router.push({
    path:'/detail',
    query:{
      id:param.prjId,
      row:JSON.stringify(param)
    }
  })
}
// 编辑
const editLetter = (param:any)=>{
  router.push({
    path:'/createProject',
    query:{
      type:'edit',
      row:JSON.stringify(param)
    }
  })
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

// 项目列表
const selectAllProject = async()=>{
  loading.value = true
  const obj={
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
      ...state.searchOption
    }
  const {data:{data,code,success,totalCount}}= await Project.selectAllProject(obj)
  if(success){
    loading.value = false
      state.list = data;
      state.totalCount =totalCount 
  } 
}
selectAllProject()
</script>
<style lang="scss" scoped>
</style>