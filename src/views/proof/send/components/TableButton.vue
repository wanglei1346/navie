<template>
  <n-space>
    <n-button text type="info" @click="examine(row)"> 查看 </n-button>
    <n-button text type="info" v-show="tabName === 'wait'" @click="edit(row)">
      编辑
    </n-button>
    <n-popconfirm @positive-click="send(row)">
      <template #trigger>
        <n-button
          v-show="tabName === 'wait'"
          :disabled="row.confState == 1"
          text
          type="info"
        >
          发送函证
        </n-button>
      </template>
      是否确定发送函证
    </n-popconfirm>
    <n-popconfirm @positive-click="invalidate(row, getList)">
      <template #trigger>
        <n-button text type="info" v-show="tabName === 'wait'"> 作废 </n-button>
      </template>
      是否确定将该函证作废，确定后可在作废函证中查看
    </n-popconfirm>
    <n-popconfirm @positive-click="down(row)">
      <template #trigger>
        <n-button text v-show="tabName === 'send'" type="info"> 下载 </n-button>
      </template>
      是否确定下载该函证
    </n-popconfirm>
    <n-popconfirm @positive-click="restore(row, getList)">
      <template #trigger>
        <n-button text v-show="tabName === 'invalidate'" type="info">
          恢复
        </n-button>
      </template>
      是否确定恢复该函证
    </n-popconfirm>
  </n-space>
</template>
<script lang="ts" setup>
import Proof from "@/api/proof"
import download from "@/utils/download"
import { useRouter } from "vue-router"
const router = useRouter()

/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-10-26 20:00:55
 * @description 函证查看
 */
const examine = (row: any) => {
  router.push({ path: `/proof/send/show/${row.confId}` })
}

/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-10-26 20:05:40
 * @description 函证编辑
 */
const edit = (row: any) => {
  router.push({ path: `/proof/send/edit/${row.confId}` })
}

/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-10-26 20:12:00
 * @description 发送函证
 */
const send = async (row: any) => {
  const {
    data: { success },
  } = await Proof.send({
    confIds: [row.confId],
    isSend: 0,
  })
  if (success) {
    window.$message.success("发送函证成功")
  }
}

/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-10-26 20:02:04
 * @description 作废
 */
const invalidate = async (
  { confId }: { confId: string },
  getList: () => void
) => {
  const {
    data: { success },
  } = await Proof.scrap({
    confIds: [confId],
    isInvalid: 0,
  })
  if (success) {
    window.$message.success("作废成功")
    getList()
  }
}

/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-12-28 16:16:51
 * @description 下载函证
 */
const down = ({ confId }: { confId: string }) => {
  download("/conf-analysis/replyFile-batch-download", { confIds: [confId] })
}

/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-12-28 16:20:04
 * @description 恢复函证
 */
const restore = async (row: any, getList: () => void) => {
  const {
    data: { success },
  } = await Proof.scrap({ confIds: [row.confId], isInvalid: 1 })
  if (success) {
    window.$message.success("恢复成功")
    getList()
  }
}
type IProp = {
  tabName: string
  row: any
  getList: () => void
}

defineProps<IProp>()
</script>
