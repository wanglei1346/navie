<template>
  <n-card
    :segmented="{
      content: true,
    }"
    :bordered="false"
  >
    <template #header>
      <n-space>
        <span>银行询证函</span>
      </n-space>
    </template>
    <template #header-extra>
      <n-space>
        <n-button type="info"  @click="saveProof(0)">暂存</n-button>
        <n-button type="info"  @click="saveProof(1)">保存</n-button>
        <n-button @click="router.push(`/project`)">返回</n-button>
      </n-space>
    </template>
    <div>
      <n-form :model="projectForm" label-placement="left" label-width="150">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="12" label="项目名称：">
            {{projectForm.prjName}}
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="项目编号：">
            {{projectForm.prjNo}}
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </div>
    <n-card
      :bordered="false"
      header-style="padding:20px 0 10px"
      content-style="padding:0"
    >
      <template #header>
        <span class="title">函证基本信息</span>
      </template>
      <ContentForm :disabled="type === 'show'" ref="contentForm" />
    </n-card>
    <n-card
      :bordered="false"
      header-style="padding:20px 0 10px"
      content-style="padding:0"
    >
      <template #header>
        <span class="title">函证内容</span>
      </template>
      <div v-if="isRouterAlive">
        <ProofContent
          v-for="(option, index) in ProofContentOptions"
          ref="proofContent"
          :length="ProofContentOptions.length"
          :option="option"
          :index="index"
          :type="type"
          :key="index"
        />
      </div>
    </n-card>
  </n-card>
</template>
<script lang="ts" setup>
import { nextTick, reactive, ref, watch,toRefs } from "vue"
import { useRoute, useRouter } from "vue-router"
// import ContentForm from "./components/ContentForm.vue"
import ContentForm from "../../proof/send/components/ContentForm.vue"
import { ProofContentOption } from "./index"
import Project from "@/api/project"
import { objectValueAllEmpty } from "@/utils/index"
import Proof from "../../../api/proof"
const proofContent = ref()
// const edit = Object.keys(ProofContentOption).map((item) => {
//   return {
//     ...ProofContentOption[item],
//     [item]: [],
//     key: item,
//   }
// })

const edit = Object.keys(ProofContentOption).map((item) => {
  return {
    ...ProofContentOption[item],
    [item]: [],
    key: item,
  }
})
// const show = Object.keys(ProofContentOption).map((item) => {
//   return {
//     ...ProofContentOption[item],
//     [item]: [],
//     key: item,
//     columns: ProofContentOption[item].columns.map((column: any) => {
//       return {
//         key: column.key,
//         title: column.title,
//       }
//     }),
//   }
// })
const isRouterAlive = ref(true)
const route = useRoute()
const router = useRouter()
const type = ref("")
const id = route.params.id
const ProofContentOptions = ref()
const contentForm = ref()
const projectForm = ref({
  prjName:route.params.prjName,
  prjNo:route.params.prjNo
})

const saveProof = async (subFlag:number)=>{
  const isFlag = await (
    await Promise.all(
      proofContent.value.map(async (item: any, index: number) => {
        const flag = await new Promise(async (resolve) => {
          const list =
            ProofContentOptions.value[index][
              ProofContentOptions.value[index]["key"]
            ]
          if (list.length === 1 && objectValueAllEmpty(list[0])) {
            resolve(true)
          } else {
            const res = await item.validateForm()
            resolve(res)
          }
        })
        return flag
      })
    )
  ).every((item) => {
    return item
  })
  if(subFlag == 1){
    if (!isFlag) return window.$message.error("请将函证内容填写完整")
    const complete = await contentForm.value.validateForm()
    if (!complete) return
  }
  // if (!isFlag) return window.$message.error("请将函证内容填写完整")
  // const complete = await contentForm.value.validateForm()
  // if (!complete) return
  const datas = bankConf()
  if(datas){
    sendData(datas,subFlag)
  }
}
const state = reactive({
    sendValue:<any>[]
})
const {} = toRefs(state)

// 创建函证 prjId
const bankConf = ()=>{
  const dataLists = {};
  ProofContentOptions.value.map((item: any, index: number)=>{
      const key = ProofContentOptions.value[index]["key"]
      dataLists[key] = item[key];
  })
  return dataLists
}

const sendData = async (datas:any,subFlag:number)=>{
  contentForm.value.model.acStateAddres = undefined
  let obj = {
    ...datas,
    bankConfInfoCO:contentForm.value.model,
    prjId: route.params.prjId,
    subFlag:subFlag
  }
  const {data:{success}} = await Project.submitSonP(obj)
  if(success){
    window.$message.success("操作成功")
    router.replace('/proof/send')
  }
}

// 查询函证详情
const projectDetail = async()=>{
        const {data:{data,success}}= await Project.projectDetail(route.params.prjId as string)
        if(success){
            const {prjConfInfoCO} = data
            formatterDetail(prjConfInfoCO,contentForm.value.model)
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

watch(
  // type
  [() => route.params,type],
  (params) => {
    type.value = params[0].type as string
    ProofContentOptions.value = edit
    isRouterAlive.value = false
    nextTick(() => {
      isRouterAlive.value = true
    })
  },
  {
    immediate: true,
  }
)
</script>
<style lang="scss" scoped>
.status {
  font-size: 13px;
  color: #666;
  padding-left: 5px;
  font-weight: normal;
}
.title {
  font-size: 14px;
  color: #666;
  border-left: 5px solid #409fff;
  padding-left: 5px;
}
</style>
