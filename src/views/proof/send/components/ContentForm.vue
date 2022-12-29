<template>
  <n-form
    ref="formRef"
    :model="model"
    label-placement="left"
    label-width="180"
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
      <n-form-item-gi
        :span="12"
        label="询证银行支付系统行号"
        path="sysBankNumber"
      >
        <n-input
          v-model:value="model.sysBankNumber"
          placeholder="请输入询证银行支付系统行号"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="证券公司名称" path="confSenderName">
        <n-input
          v-model:value="model.confSenderName"
          placeholder="请输入证券公司名称"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="证券公司会员代码"
        path="securitiesCompanyMemberCode"
      >
        <n-input
          v-model:value="model.securitiesCompanyMemberCode"
          placeholder="请输入证券公司会员代码"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="证券公司回函地址"
        path="confReplyerAddress"
      >
        <n-input
          v-model:value="model.confReplyerAddress"
          placeholder="请输入证券公司回函地址"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="证券公司联系人"
        path="confReplyerContacts"
      >
        <n-input
          v-model:value="model.confReplyerContacts"
          placeholder="请输入证券公司联系人"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="联系人电话" path="confReplyerPhone">
        <n-input
          v-model:value="model.confReplyerPhone"
          placeholder="请输入联系人电话"
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
      <n-form-item-gi :span="12" label="审计准则" path="auditCriteria">
        <n-input
          v-model:value="model.auditCriteria"
          placeholder="请输入审计准则"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="授权公司名称" path="acName">
        <n-input
          v-model:value="model.acName"
          placeholder="请输入授权公司名称"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="授权单位统一社会信用代码"
        path="acSocialCreditCode"
      >
        <n-input
          v-model:value="model.acSocialCreditCode"
          placeholder="请输入授权单位统一社会信用代码"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="授权单位LEI编码" path="acLeiCode">
        <n-input
          v-model:value="model.acLeiCode"
          placeholder="请输入授权单位LEI编码"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="授权单位联系人"
        path="acReplyerContacts"
      >
        <n-input
          v-model:value="model.acReplyerContacts"
          placeholder="请输入授权单位联系人"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="授权单位联系人电话"
        path="acReplyerPhone"
      >
        <n-input
          v-model:value="model.acReplyerPhone"
          placeholder="请输入授权单位联系人电话"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="授权单位省/市/县" path="acStateCounty">
        <n-cascader
          placeholder="请选择授权单位省/市/县"
          v-model:value="model.acStateCounty"
          :options="Area"
          check-strategy="child"
          show-path
          @update:value="updateAddress"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="授权单位详细地址" path="acAddress">
        <n-input
          v-model:value="model.acAddress"
          placeholder="请输入授权单位详细地址"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="支取办理询证函回函服务费用的账户"
        path="paymentAccount"
      >
        <n-input
          v-model:value="model.paymentAccount"
          placeholder="请输入支取办理询证函回函服务费用的账户"
        />
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import Area from "./area.json"
const model = reactive({
  confBeginDate: null,
  confEndDate: null,
  bankName: null,
  sysBankNumber: null,
  securitiesCompanyMemberCode: null,
  confSenderName: null,
  auditCriteria: null,
  confReplyerAddress: null,
  confReplyerContacts: null,
  confReplyerPhone: null,
  confReplyerFax: null,
  confReplyerPostcode: null,
  confReplyerEmail: null,
  acName: null,
  acSocialCreditCode: null,
  acLeiCode: null,
  acReplyerContacts: null,
  acReplyerPhone: null,
  acAddress: null,
  paymentAccount: null,
  acStateAddres: null,
  acStateProvince: null,
  acStateCity: null,
  acStateCounty: null,
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
  sysBankNumber: [
    { required: true, message: "请输入询证银行支付系统行号", trigger: "blur" },
  ],
  securitiesCompanyMemberCode: [
    { required: true, message: "请输入证券公司会员代码", trigger: "blur" },
  ],
  confReplyerAddress: [
    { required: true, message: "请输入证券公司回函地址", trigger: "blur" },
  ],
  confReplyerContacts: [
    { required: true, message: "请输入证券公司联系人", trigger: "blur" },
  ],
  confReplyerFax: [
    { required: true, message: "请输入回函传真", trigger: "blur" },
  ],
  auditCriteria: [
    { required: true, message: "请输入审计准则", trigger: "blur" },
  ],
  acName: [{ required: true, message: "请输入授权公司名称", trigger: "blur" }],
  acSocialCreditCode: [
    {
      required: true,
      message: "请输入授权单位统一社会信用代码",
      trigger: "blur",
    },
  ],
  acLeiCode: [
    { required: true, message: "请输入授权单位LEI编码", trigger: "blur" },
  ],
  confSenderName: [
    { required: true, message: "请输入证券公司名称", trigger: "blur" },
  ],
  confReplyerPhone: [
    { required: true, message: "请输入回函电话", trigger: "blur" },
  ],

  acReplyerContacts: [
    { required: true, message: "请输入授权单位联系人", trigger: "blur" },
  ],
  acReplyerPhone: [
    { required: true, message: "请输入授权单位联系人电话", trigger: "blur" },
  ],
  acStateCounty: [
    { required: true, message: "请选择授权单位省/市/县", trigger: "change" },
  ],
  acAddress: [
    { required: true, message: "请输入授权单位详细地址", trigger: "blur" },
  ],
  paymentAccount: [
    {
      required: true,
      message: "请输入支取办理询证函回函服务费用的账户",
      trigger: "blur",
    },
  ],
}
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-12-09 14:37:43
 * @description 回函地址数据
 */
const updateAddress = (value: any[], option: any, pathValues: any) => {
  model.acStateProvince = pathValues[0].value
  model.acStateCity = pathValues[1].value
  model.acStateCounty = pathValues[2].value
  model.acStateAddres = pathValues.reduce((prev: string, cur: any) => {
    return prev + cur.label
  }, "")
  console.log(model)
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
  type: {
    default: "add",
    type: String,
  },
})
defineExpose({ model, validateForm })
</script>
<style lang="scss" scoped>
:deep(.n-date-picker) {
  width: 100%;
}
</style>
