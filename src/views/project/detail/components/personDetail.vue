<template>
  <div>
    <div class="basicInfo">
      <p class="title">项目人员信息</p>
      <div class="basicForm">
        <DataTable
        :row-key="rowKey"
        :loading="loading"
        :columns="columns"
        :page="pageIndex"
        :data="list"
        :count="count"
        @handlePage="handlePage"
        @handlePageSize="handlePageSize"
      />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {reactive,toRefs,ref,h,defineExpose} from 'vue'
  import { useMessage,NSpace,NPopconfirm,NButton } from 'naive-ui'
  import Project from '@/api/project'
  const formBasic = ref()
  const loading = ref(false)
  const state = reactive({
    columns:[
      {
        title:'序号',
        key: 'code',
        render(row:any,index:number){
          return index+1;
        }
      },
      {
        title:'姓名',
        key: 'cnName',
        render(row:any){
          return !row.cnName?'-':row.cnName
        }
      },
      {
        title:'工号',
        key: 'jobNo',
        render(row:any){
          return !row.jobNo?'-':row.jobNo
        }
      },
      {
        title:'账号',
        key: 'userAccount',
        render(row:any){
          return !row.userAccount?'-':row.userAccount
        }
      },
      {
        title:'部门',
        key: 'orgName',
        render(row:any){
          return !row.orgName?'-':row.orgName
        }
      },
      {
        title:'手机号',
        key: 'userMobile',
        render(row:any){
          return !row.userMobile == null?'-':row.userMobile
        }
      },
      {
        title:'邮箱',
        key: 'userEmail',
        render(row:any){
          return !row.userEmail?'-':row.userEmail
        }
      },
      {
        title:'职务',
        key: 'duty',
        render(row:any){
          return !row.duty?'-':row.duty
        }
      },
    ],
    pageIndex:1,
    pageSize:10,
    list:[],
    count:0
  })

  const props = defineProps({
    prjId:{
      type:String
    }
  })
  const {columns,pageIndex,list,count} = toRefs(state)
  const rowKey = (row:any)=>row.code
  
  
  // 页码回调
const handlePage = (page: number) => {
  state.pageIndex = page
  getList()
}

// 页条回调
const handlePageSize = (pageSize: number) => {
  state.pageSize = pageSize
  getList()
}

// 项目列表
const getList = async()=>{
  const obj={
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
      prjId:props.prjId
    }
  const {data:{data,success,totalCount}}= await Project.selectMemberInfoByProjectId(obj)
  loading.value = true
  if(success){
    loading.value = false
      const datas = data.map((i:any)=>{
        i.sysUserInfoCO.duty=i.duty
        return i.sysUserInfoCO
      })
      state.list = datas;
      state.count =totalCount 
  } 
}
getList()

defineExpose({state})
</script>

<style lang="scss" scoped>
.basicInfo{
  .title{
    font-size:16px;
    margin-bottom:30px;
  }
}
</style>