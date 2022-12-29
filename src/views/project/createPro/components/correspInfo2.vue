<template>
  <div>
    <div class="basicInfo">
      <n-card
      :bordered="false"
      header-style="padding:20px 0 10px"
      content-style="padding:0"
      v-if="props.type == 'detail'"
    >
      <template #header>
        <span class="title">项目函11证信息</span>
      </template>
    </n-card>
      <n-card
      :segmented="{
        content: true,
      }"
      :bordered="false"
    >
      <template #header>
        <n-space>
          <span>项目函22证信息 </span>
        </n-space>
      </template>
    </n-card>
      <div class="basicForm">
        <n-form
          ref="formBasic"
          inline
          :label-width="180"
          :model="formValue"
          label-placement="left"
          require-mark-placement="right-hanging"
        >
        <!-- :cols="2"一行显示几个 -->
        <n-grid :x-gap="12" :y-gap="8" :cols="2">
          <n-grid-item>
            <n-form-item label="函证起始时间" path="confBeginDate">
              <n-date-picker 
              v-model:formatted-value="formValue.confBeginDate" 
              type="date" 
              placeholder="函证起始时间"
              value-format="yyyy-MM-dd"
              :disabled="props.type == 'detail'?true:false"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="函证截止时间" path="confEndDate">
              <n-date-picker 
              v-model:formatted-value="formValue.confEndDate" type="date" placeholder="函证截止时间" value-format="yyyy-MM-dd"
              :disabled="props.type == 'detail'?true:false"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="银行名称" path="bankName">
              <n-input v-model:value="formValue.bankName" placeholder="银行名称" :disabled="props.type == 'detail'?true:false"/>
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="银行账号" path="bankAccount">
              <n-input v-model:value="formValue.bankAccount" placeholder="银行账号" :disabled="props.type == 'detail'?true:false"/>
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="发函方名称" path="confSenderName">
              <n-input v-model:value="formValue.confSenderName" placeholder="发函方名称" :disabled="props.type == 'detail'?true:false"/>
            </n-form-item>
          </n-grid-item>  
          <n-grid-item>
            <n-form-item label="回函地址" path="confReplyerAddress">
              <!-- <n-input v-model:value="formValue.confReplyerAddress" placeholder="回函地址" :disabled="props.type == 'detail'?true:false" /> -->
              <n-cascader
                placeholder="请选择回函地址"
                v-model:value="formValue.confReplyerAddress"
                :options="Area"
                check-strategy="child"
                show-path
                @update:value="updateAddress"
              />
            </n-form-item>
          </n-grid-item>  
          <n-grid-item>
            <n-form-item label="回函联系人" path="confReplyerContacts">
              <n-input v-model:value="formValue.confReplyerContacts" placeholder="回函联系人" :disabled="props.type == 'detail'?true:false"/>
            </n-form-item>
          </n-grid-item>  
          <n-grid-item>
            <n-form-item label="回函电话" path="confReplyerPhone">
              <n-input v-model:value="formValue.confReplyerPhone" placeholder="回函电话" :disabled="props.type == 'detail'?true:false" />
            </n-form-item>
          </n-grid-item>  
          <n-grid-item>
            <n-form-item label="回函传真" path="confReplyerFax">
              <n-input v-model:value="formValue.confReplyerFax" placeholder="回函传真" :disabled="props.type == 'detail'?true:false"/>
            </n-form-item>
          </n-grid-item>  
          <n-grid-item>
            <n-form-item label="回函邮编" path="confReplyerPostcode">
              <n-input v-model:value="formValue.confReplyerPostcode" placeholder="回函邮编" :disabled="props.type == 'detail'?true:false"/>
            </n-form-item>
          </n-grid-item>  
          <n-grid-item>
            <n-form-item label="回函电子邮箱" path="confReplyerEmail">
              <n-input v-model:value="formValue.confReplyerEmail" placeholder="回函电子邮箱" :disabled="props.type == 'detail'?true:false" />
            </n-form-item>
          </n-grid-item>  
        </n-grid>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {reactive,toRefs,ref,defineExpose,defineProps,watch} from 'vue'
  import { useMessage } from 'naive-ui'
  import Area from "../../../proof/send/components/area.json"
  const formBasic = ref()

  const state = reactive({
    formValue:{
      confBeginDate:null,
      confEndDate:null,
      bankName:'',
      bankAccount:'',
      confReplyerContacts:'',
      confSenderName:'',
      confReplyerAddress:'',
      confReplyerPhone:'',
      confReplyerFax:'',
      confReplyerPostcode:'',
      confReplyerEmail:''
    },
  })
  const {formValue} = toRefs(state)
  const updateAddress = (value: any[], option: any, pathValues: any) => {
    state.formValue.confReplyerAddress = pathValues.reduce((prev: string, cur: any) => {
      return prev + cur.label
    }, "")
  }
  type formValueType = {
    confBeginDate:null,
    confEndDate:null,
    bankName:string,
    bankAccount:string,
    confSenderName:string,
    confReplyerAddress:string,
    confReplyerContacts:string,
    confReplyerFax:string,
    confReplyerPostcode:string,
    confReplyerPhone:string,
    confReplyerEmail:string,
  }
  type IProType = {
    formValue:formValueType,
    type:String
  }
  const props = defineProps<IProType>()
  
  if(props.type == 'edit'){
    state.formValue = props.formValue
    console.log(state.formValue,'formValue')
      watch(
      () => props.formValue,
      (newvalue,oldvalue) => {
        state.formValue = newvalue
      },{
        deep: true
      }
    );
  }
  
  defineExpose({state})

</script>

<style lang="scss" scoped>
.basicInfo{
  .title {
  font-size: 14px;
  color: #666;
  border-left: 5px solid #409fff;
  padding-left: 5px;
}
  .n-form-item-blank{
    .n-date-picker{
      width:100%;
    }
  }
}
</style>