<template>
  <n-space class="mb20">
    <n-popconfirm
      v-if="tabName !== 'send'"
      @positive-click="sendAndRestore(checkedRowKeys, tabName, getList)"
    >
      <template #trigger>
        <n-button :disabled="checkedRowKeys.length === 0" type="info">
          {{ tabName == "wait" ? "发送函证" : "批量恢复" }}
        </n-button>
      </template>
      {{ tabName == "wait" ? "是否确定发送所选函证" : "是否确定恢复所选函证" }}
    </n-popconfirm>
    <n-popconfirm
      v-if="tabName == 'send'"
      @positive-click="downProof(checkedRowKeys)"
    >
      <template #trigger>
        <n-button type="info" :disabled="checkedRowKeys.length === 0">
          下载函证
        </n-button>
      </template>
      是否确定下载所选函证
    </n-popconfirm>
    <n-button
      type="info"
      :disabled="checkedRowKeys.length === 0"
      v-if="tabName !== 'invalidate'"
      @click="derive(checkedRowKeys)"
    >
      批量导出
    </n-button>
    <n-popconfirm
      v-if="tabName === 'wait'"
      @positive-click="batchScrap(checkedRowKeys, getList)"
    >
      <template #trigger>
        <n-button :disabled="checkedRowKeys.length === 0" type="info">
          批量作废
        </n-button>
      </template>
      是否确定作废所选函证
    </n-popconfirm>
  </n-space>
</template>
<script lang="ts" setup>
import Proof from "@/api/proof"
import download from "@/utils/download"
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-12-10 16:00:05
 * @description 发送函证/恢复
 */
const sendAndRestore = (
  checkedRowKeys: any[],
  tabName: string,
  getList: () => void
) => {
  if (tabName == "wait") {
    sendProof(checkedRowKeys, getList)
  } else {
    scrap(checkedRowKeys, getList, 1)
  }
}
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-12-28 15:20:32
 * @description 批量作废
 */
const batchScrap = (checkedRowKeys: any[], getList: () => void) => {
  scrap(checkedRowKeys, getList, 0)
}
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-12-09 17:41:54
 * @description 发送函证
 */
const sendProof = async (confIds: string[], getList: () => void) => {
  const {
    data: { success },
  } = await Proof.send({ confIds, isSend: 0 })
  if (success) {
    window.$message.success("发送函证成功")
    getList()
  }
}
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-12-10 15:35:13
 * @description 作废/恢复
 */
const scrap = async (
  checkedRowKeys: any[],
  getList: () => void,
  isInvalid: number
) => {
  const {
    data: { success },
  } = await Proof.scrap({ confIds: checkedRowKeys, isInvalid })
  if (success) {
    window.$message.success(isInvalid ? "恢复成功" : "作废成功")
    checkedRowKeys.length = 0
    getList()
  }
}
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-12-28 15:23:42
 * @description 下载函证
 */
const downProof = (confIds: any[]) => {
  download("/conf-analysis/replyFile-batch-download", { confIds })
}
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-12-28 15:24:20
 * @description 批量导出
 */
const derive = (confIds: any[]) => {
  download("/conf-analysis/excel-download", { confIds })
}
type IProp = {
  tabName: string
  checkedRowKeys: Array<string | number>
  getList: () => void
}
defineProps<IProp>()
</script>
