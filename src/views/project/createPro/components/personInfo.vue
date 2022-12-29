<template>
  <div>
    <div class="basicInfo">
      <n-card
        title="项目人员信息"
        :segmented="{
          content: true,
          footer: 'soft'
        }"
        :bordered="false"
      >
        <!-- <template #header>
          <n-space>
            <span>项目人员信息 </span>
          </n-space>
        </template> -->
      </n-card>
      <div class="basicForm">
        <DataTable
        :loading="loading"
        :row-key="rowKey"
        :columns="columns"
        :data="data"
        :hasPagination="false"
      />
      <n-button type="info" @click="addPerson" style="margin-top:20px;">新增</n-button>
      <span style="color:red;display: inline-block;margin-left:10px">系统内选择用户</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import CreatePerson from './createPersonDialog.vue'
  import {reactive,toRefs,ref,h,defineExpose,watch} from 'vue'
  import { useMessage,NSpace,NPopconfirm,NButton,NInput } from 'naive-ui'
  import Project from '@/api/project';
  const formBasic = ref()
  const loading = ref(false)

  const state = reactive({
    columns:[
      {
        title:'序号',
        key: 'code',
        render:(row:any,index:any)=>{
          return index+1
        }
      },
      {
        title:'姓名',
        key: 'cnName'
      },
      {
        title:'工号',
        key: 'jobNo'
      },
      {
        title:'账号',
        key: 'userAccount'
      },
      {
        title:'部门',
        key: ''
      },
      {
        title:'手机号',
        key: 'userMobile'
      },
      {
        title:'邮箱',
        key: 'userEmail'
      },
      {
        title:'职务',
        key: 'duty',
        render(row:any,index:number){
          return h(NInput,{
            value:row.duty,
            onUpdateValue(v){
              data.value[index].duty = v
            }
          })
        }
      },
      {
        title:'操作',
        key: 'actions',
        render:(row:any,index:number)=>{
          return h(NSpace, {}, () => [
            h(
              NPopconfirm,
              {
                onPositiveClick: () => deleteUser(row,index),
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
                        // onClick:(row:any)=>{
                        //   console.log(row,'row')
                        //   deleteUser(row.userId)
                        // }
                      },
                      { default: () => "删除" }
                    ),
              }
            )
          ])
        }
      }
    ],
    departmentLists:[],
    personLists:[],
    personValues:<any>[] ,
    data:<any>[]
  })
  const {columns,data} = toRefs(state)

  const rowKey = (row:any)=>row.code
  const invalidate = (row:any,index:number)=>{
    state.data.splice(index,1)
  }

// 新增人员
const addPerson = ()=>{
  window.$dialog.success({
    title: "新增人员",
    content: () => h(CreatePerson, {
      departmentList:state.departmentLists,
      personList:state.personLists,
      onUpdate:(value:number|string)=>{
        getUserListByOrg(value)
      },
      // 选择人员
      onUpdateper(value:Array<number>){
        state.personValues = value
      }
    }, {}),
    positiveText: "确定",
    negativeText: "取消",
    maskClosable:false,
    onPositiveClick: () => {
      PositiveClick()
    },
    // 取消按钮
    onNegativeClick: () => {
      // window.$message.error("不确定")
    },
    onAfterEnter:()=>{
      getOrganizationList()
    }
  })
}

// 点击确定按钮
const PositiveClick = ()=>{
      // 筛选人员中和当前选中id一致的人
      let dataList:any[]= state.personLists.filter(i=>state.personValues.includes((i as any).userId))
      state.data.push(...dataList)
      // 将userID去重
      let obj = {};
      let peon = state.data.reduce((cur:any,next:any) => {
          obj[next.userId] ? "" : obj[next.userId] = true && cur.push(next);
          return cur;
      },[])
      state.data = peon
      return true
}
// 删除人员
const deleteUser = async (row:any,index:Number)=>{
    if(props.type == 'edit'){
      if(row.id){
        const {data:{success}} = await  Project.deleteProjectMember(row.id)
        if(success){
          state.data.splice(index,1)
        }
      }else{
        state.data.splice(index,1)
      }
    }else{
      state.data.splice(index,1)
    }
}
// 部门列表
const getOrganizationList = async()=>{
  const {data:{data,success}}= await Project.organizationList({parentId:0})
  if(success){
       state.departmentLists = data
       if(data.length){
        getUserListByOrg(data[0].orgCode)
       }
  } 
}
getOrganizationList()
// 部门查人员
const getUserListByOrg = async (id:number|string)=>{
  const {data:{data,success}}= await Project.getUserListByOrg({orgCode:id})
  if(success){
       state.personLists = data
  } 
}

const props = defineProps({
  type:{
    type:String,
  },
  prjId:{
    type:String
  }
}
)

const detailPerson = async ()=>{
  const obj={
      pageIndex: 1,
      pageSize: 10,
      prjId:props.prjId
    }
  const {data:{data,success,totalCount}}= await Project.selectMemberInfoByProjectId(obj)
  loading.value = true
  if(success){
    loading.value = false
      const datas = data.map((i:any)=>{
        i.sysUserInfoCO.duty=i.duty
        i.sysUserInfoCO.id=i.id
        return i.sysUserInfoCO
      })
      state.data = datas;
  } 
}

if(props.type == 'edit'){
  detailPerson()
}else{

}


defineExpose({state})
</script>

<style lang="scss" scoped>
.basicInfo{
  .title{
    font-size:16px;
    margin-bottom:30px;
  }
  .basicForm{
    padding:0px 40px;
  }
}
</style>