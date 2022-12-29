<template>
  <n-form
    ref="formRef"
    :model="model"
    label-placement="left"
    label-width="150"
    :disabled="disabled"
    :rules="rules"
  >
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="12" label="函证起始时间" path="confBeginDate">
        <n-date-picker
          v-model:formatted-value="model.confBeginDate"
          value-format="yyyy-MM-dd"
          type="date"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="函证截止时间" path="confEndDate">
        <n-date-picker
          v-model:formatted-value="model.confEndDate"
          value-format="yyyy-MM-dd"
          type="date"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="银行名称" path="bankName">
        <n-input v-model:value="model.bankName" placeholder="请输入银行名称" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="银行账号" path="bankAccount">
        <n-input
          v-model:value="model.bankAccount"
          placeholder="请输入银行账号"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="发行人名称" path="issrName">
        <n-input
          v-model:value="model.issrName"
          placeholder="请输入发行人名称"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="发行人社会信用代码" path="issrUscCode">
        <n-input
          v-model:value="model.issrUscCode"
          placeholder="请输入发行人社会信用代码"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="发函方名称" path="confSenderName">
        <n-input
          v-model:value="model.confSenderName"
          placeholder="请输入发函方名称"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="回函地址" path="confReplyerAddress">
        <n-cascader
          placeholder="请选择回函地址"
          v-model:value="model.confReplyerAddress"
          :options="Area"
          check-strategy="child"
          show-path
          @update:value="updateAddress"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="回函联系人" path="confReplyerContacts">
        <n-input
          v-model:value="model.confReplyerContacts"
          placeholder="请输入回函联系人"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="回函电话" path="confReplyerPhone">
        <n-input
          v-model:value="model.confReplyerPhone"
          placeholder="请输入回函电话"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="回函传真" path="confReplyerFax">
        <n-input
          v-model:value="model.confReplyerFax"
          placeholder="请输入回函传真"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="回函邮编" path="confReplyerPostcode">
        <n-input
          v-model:value="model.confReplyerPostcode"
          placeholder="请输入回函邮编"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="回函电子邮箱" path="confReplyerEmail">
        <n-input
          v-model:value="model.confReplyerEmail"
          placeholder="请输入回函电子邮箱"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="经办人" path="agentName">
        <n-input v-model:value="model.agentName" placeholder="请输入经办人" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="经办电话" path="agentPhone">
        <n-input
          v-model:value="model.agentPhone"
          placeholder="请输入经办电话"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="经办人职务" path="agentDuty">
        <n-input
          v-model:value="model.agentDuty"
          placeholder="请输入经办人职务"
        />
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue"
import Area from "./area.json"
const model = reactive({
  confBeginDate: null,
  confEndDate: null,
  bankName: null,
  bankAccount: null,
  issrName: null,
  issrUscCode: null,
  confSenderName: null,
  confReplyerAddress: null,
  confReplyerContacts: null,
  confReplyerPhone: null,
  confReplyerFax: null,
  confReplyerPostcode: null,
  confReplyerEmail: null,
  agentName: null,
  agentDuty: null,
  agentPhone: null,
})
const formRef = ref()
const rules = {
  confBeginDate: [
    {
      required: true,
      trigger: "change",
      message: "请选择函证起始时间",
    },
  ],
  confEndDate: [
    { required: true, message: "请选择函证截止时间", trigger: "change" },
  ],
  bankName: [{ required: true, message: "请输入银行名称", trigger: "blur" }],
  bankAccount: [{ required: true, message: "请输入银行账号", trigger: "blur" }],
  issrName: [
    { required: true, message: "请输入发行人名称", trigger: "blur" },
  ],
  issrUscCode: [
    { required: true, message: "请输入发行人社会信用代码", trigger: "blur" },
  ],
  confSenderName: [
    { required: true, message: "请输入发函方名称", trigger: "blur" },
  ],
  confReplyerAddress: [
    { required: true, message: "请选择回函地址", trigger: "change" },
  ],
  confReplyerContacts: [
    { required: true, message: "请输入回函联系人", trigger: "blur" },
  ],
  confReplyerPhone: [
    { required: true, message: "请输入回函电话", trigger: "blur" },
  ],
}
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-12-09 14:37:43
 * @description 回函地址数据
 */
const updateAddress = (value: any[], option: any, pathValues: any) => {
  model.confReplyerAddress = pathValues.reduce((prev: string, cur: any) => {
    return prev + cur.label
  }, "")
}
const validateForm = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await formRef.value.validate()
      resolve(true)
    } catch {
      resolve(false)
    }
  })
}
defineProps({
  disabled: {
    default: false,
    type: Boolean,
  },
})
defineExpose({ model, validateForm })
</script>
<style lang="scss" scoped>
:deep(.n-date-picker) {
  width: 100%;
}
</style>
