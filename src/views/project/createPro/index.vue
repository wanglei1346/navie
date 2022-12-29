<template>
  <div>
    <div>
      <basic-info ref="basicInfoRef" :type="(pageType as string)"></basic-info>
      <corresp-info ref="correspInfoRef" :type="(pageType as string)"></corresp-info>
      <person-info ref="personInfoRef" :type="(pageType as string)" :prjId="prjId"></person-info>
      <div align="center">
        <n-button type="primary" size="large" style="margin-right:20px;" @click="send">保存</n-button>
        <n-button size="large" @click="back">取消</n-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BasicInfo from './components/basicInfo.vue'
  import PersonInfo from './components/personInfo.vue'
  import CorrespInfo from './components/correspInfo.vue'
  import Project from '@/api/project'
  import {ref,reactive,toRefs} from 'vue'
  import {useRouter,useRoute} from "vue-router"
import { stringify } from 'querystring'

  const basicInfoRef = ref()
  const correspInfoRef = ref()
  const personInfoRef = ref()
  const router = useRouter()
  const route = useRoute()

  const pageType = route.query.type|| 'add'
  let prjId:any;
  let prjConfId:string;
  if(pageType == 'edit') prjId =JSON.parse(route.query.row as string).prjId|| {}

  const send = ()=>{
    basicInfoRef.value.handleValidateClick().then((status:any)=>{
      // 校验通过
      if(!status){
        const basicData = basicInfoRef.value.model
        const correspData = correspInfoRef.value.model
        console.log(correspData,'correspData')
        correspData.acStateAddres = undefined
        const personData = personInfoRef.value.state.data
        if(pageType == 'edit'){
          basicData.prjId = prjId,
          // basicData.createDate = undefined
          // basicData.status = undefined
          // correspData.createDate=undefined
          // correspData.updateDate=undefined
          // correspData.prjId = undefined
          correspData.prjConfId = prjConfId
        }
        let personList:any =[]
        personData.forEach((i:any)=>{
          personList.push({
            userId:i.userId,
            duty:i.duty,
            id:pageType == 'edit' ?i.id:undefined
          })
        })
        createProject(basicData,correspData,personList)
      }
    })   
  }
  // 新增项目
  const createProject = async(basicData:any,prjConfInfoCO:any,prjMemberInfoCOList:any)=>{
    const {data:{data,success}} = await Project.addProject(
      {
        prjConfInfoCO:prjConfInfoCO,
        prjInfoCO:basicData,
        prjMemberInfoCOList:prjMemberInfoCOList
      })
    if(success){
      router.push('/project')
    }
  }
 
  // 查询函证详情
  const projectDetail = async(id:string)=>{
        const {data:{data,success}}= await Project.projectDetail(id)
        if(success){
            const {prjInfoCO,prjConfInfoCO} = data
            prjConfId = prjConfInfoCO.prjConfId
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
  if(pageType == 'edit'){
      const projectInfo =JSON.parse(route.query.row as string)|| {}
      const id = projectInfo.prjId
      projectDetail(id)
  }
  
  const back = ()=>{
    router.go(-1)
  }
</script>

<style lang="scss" scoped>

</style>