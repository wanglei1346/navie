<template>
  <n-space>
    <n-button text type="info" @click="examine(row)"> 查看 </n-button>
    <n-button text type="info" v-show="tabName === 'wait'" @click="edit(row)">
      编辑
    </n-button>
    <n-popconfirm @positive-click="send(row)">
      <template #trigger>
        <n-button v-show="tabName === 'wait'" text type="info">
          发送函证
        </n-button>
      </template>
      是否确定发送函证
    </n-popconfirm>
    <n-popconfirm @positive-click="invalidate(row)">
      <template #trigger>
        <n-button text type="info" v-show="tabName === 'wait'"> 作废 </n-button>
      </template>
      是否确定将该函证作废，确定后可在作废函证中查看
    </n-popconfirm>
    <n-popconfirm @positive-click="revocation(row)">
      <template #trigger>
        <n-button text v-show="tabName === 'send'" type="info"> 撤销 </n-button>
      </template>
      是否确定将该函证撤销
    </n-popconfirm>
    <n-popconfirm @positive-click="delet(row)">
      <template #trigger>
        <n-button text v-show="tabName === 'invalidate'" type="info">
          删除
        </n-button>
      </template>
      是否确定将该函证删除
    </n-popconfirm>
  </n-space>
</template>
<script lang="ts" setup>
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-10-26 20:00:55
 * @description 函证查看
 */
const examine = (row: any) => {
  console.log(row)
}

/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-10-26 20:05:40
 * @description 函证编辑
 */
const edit = (row: any) => {
  console.log(row)
}

/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-10-26 20:12:00
 * @description 发送函证
 */
const send = (row: any) => {
  console.log(row)
}

/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-10-26 20:02:04
 * @description 作废
 */
const invalidate = (row: any) => {
  console.log(row)
}

/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-10-26 20:10:39
 * @description 撤销
 */
const revocation = (row: any) => {
  console.log(row)
}

/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-10-26 20:09:47
 * @description 删除
 */
const delet = (row: any) => {
  console.log(row)
}
type IProp = {
  tabName: string
  row: any
}

defineProps<IProp>()
</script>
