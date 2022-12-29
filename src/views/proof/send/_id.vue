<template>
  <n-card
    :segmented="{
      content: true,
    }"
    :bordered="false"
  >
    <template #header>
      <n-space>
        <span>浏览函证 </span>
        <div>
          <n-badge dot color="#2f79fd" /><span class="status">待回函</span>
        </div>
      </n-space>
    </template>
    <template #header-extra>
      <n-space>
        <n-button
          type="info"
          v-if="type === 'show'"
          @click="router.push(`/proof/send/edit/${id}`)"
          >编辑</n-button
        >
        <n-button type="info" v-if="type !== 'show'" @click="saveProof(0)"
          >暂存</n-button
        >
        <n-button type="info" v-if="type !== 'show'" @click="saveProof(1)"
          >保存</n-button
        >
        <n-button @click="router.push(`/proof/send`)">返回</n-button>
      </n-space>
    </template>
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
import { nextTick, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import ContentForm from "./components/ContentForm.vue"
import { ProofContentOption } from "./index"
import { objectValueAllEmpty } from "@/utils/index"
import Proof from "@/api/proof"
import Project from "@/api/project"
const proofContent = ref()
const prjId = ref()
const edit = Object.keys(ProofContentOption).map((item) => {
  return {
    ...ProofContentOption[item],
    [item]: [],
    key: item,
  }
})
const show = Object.keys(ProofContentOption).map((item) => {
  return {
    ...ProofContentOption[item],
    [item]: [],
    key: item,
    columns: ProofContentOption[item].columns.map((column: any) => {
      return {
        key: column.key,
        title: column.title,
      }
    }),
  }
})
const isRouterAlive = ref(true)
const route = useRoute()
const router = useRouter()
const type = ref("")
const id = route.params.id
const ProofContentOptions = ref()
const contentForm = ref()
const saveProof = async (subFlag: number) => {
  const params = {
    confId: id,
    bankConfInfoCO: {
      ...contentForm.value.model,
      askBizTypeList: [],
    },
    subFlag,
    prjId: prjId.value,
  }
  ProofContentOptions.value.forEach((option: any) => {
    const key = option.key
    params[key] = option[key]
    params.bankConfInfoCO.askBizTypeList.push(option.active)
  })
  if (subFlag) {
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
    const complete = await contentForm.value.validateForm()
    if (!complete || !isFlag)
      return window.$message.error("请将函证内容填写完整")
    editProof(params)
  }
  editProof(params)
}
const editProof = async (params: any) => {
  const {
    data: { success },
  } = await Project.submitSonP(params)
  if (success) {
    window.$message.success("保存成功")
    router.push("/proof/send")
  }
}
const getDetail = async () => {
  const {
    data: { data },
  } = await Proof.detail(id as string)
  prjId.value = data.prjId
  for (let key in data.bankConfInfoCO) {
    contentForm.value.model[key] = data.bankConfInfoCO[key]
  }
  ProofContentOptions.value.forEach((option: any, index: number) => {
    if (data[option["key"]].length !== 0) {
      option[option["key"]] = data[option["key"]]
    }
    option.active = data.bankConfInfoCO.askBizTypeList[index]
  })
}
watch(
  () => route.params,
  (params) => {
    if (params.type && params.id) {
      getDetail()
      type.value = params.type as string
      ProofContentOptions.value = type.value === "show" ? show : edit
      isRouterAlive.value = false
      nextTick(() => {
        isRouterAlive.value = true
      })
    }
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
