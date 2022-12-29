<template>
  <div>
    <div class="basicInfo">
        <div align="right">
          <n-button type="primary" @click="editPro" style="margin-right:20px;">编辑</n-button>
          <n-button type="primary" @click="goBack">返回</n-button>
        </div>
      <BasicDetail :disabled="true" ref="basicInfoRef"/>
    </div>
    <div>
      <div align="right">
        <!-- <n-button type="primary" @click="importRecord" >导入记录</n-button> -->
        <n-button type="primary" @click="letterStatis" style="margin:0px 20px;">函证统计</n-button>
        <n-button type="primary" @click="goletter">发起函证</n-button>
      </div>
      <CorrespDetail :disabled="true" ref="correspInfoRef"/>
    </div>
    <person-detail :prjId="(id as string)"></person-detail>
  </div>
</template>

<script lang="ts" setup>
  import BasicDetail from '../createPro/components/basicInfo.vue'
  import CorrespDetail from '../createPro/components/correspInfo.vue'
  import PersonDetail from './components/personDetail.vue'
  import Project from '@/api/project'
  import {useRoute,useRouter} from "vue-router"
  import {reactive,toRefs,ref} from 'vue'
  const route = useRoute()
  const router = useRouter()
  const basicInfoRef = ref()
  const correspInfoRef = ref()
  const id = route.query.id

  const editPro = ()=>{
    const param = JSON.parse(route.query.row  as any)
    console.log(param,'param')
    router.push({
      path:'/createProject',
      query:{
        type:'edit',
        row:JSON.stringify(param)
      }
    })
  }
  const goBack = ()=>{
    router.go(-1)
  }
  // const importRecord = ()=>{
  //   router.push({
  //     path:'/ImportRecords',
      
  //   })
  // }

  const letterStatis = ()=>{
    router.push({
      path:'/statistics',
      query:{
        prjId:id
      }
    })
  }
  const goletter = ()=>{
    router.push({
      path:'/createLetter',
    })
  }
  
  // 查询函证详情
  const projectDetail = async()=>{
        const {data:{data,success}}= await Project.projectDetail(id as string)
        if(success){
            const {prjInfoCO,prjConfInfoCO} = data
            formatterDetail(prjConfInfoCO,correspInfoRef.value.model)
            formatterDetail(prjInfoCO,basicInfoRef.value.model) 
        } 
    }
  
  const formatterDetail = (data:any,originData:any)=>{
    for (let key in data) {
        for(let keymodel in originData){
          if(key == keymodel){
            originData[keymodel] = data[key]
          }
        }
    }
  }
  projectDetail()
</script>

<style lang="scss" scoped>
.basicInfo{
  .title{
    font-size:16px;
    margin-bottom:30px;
  }
}
</style>
