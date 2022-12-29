<template>
  <div>
    <div class="basicInfo">
      <n-card
        :segmented="{
          content: true,
        }"
        :bordered="false"
      >
        <template #header>
          <n-space>
            <span>项目基本信息 </span>
          </n-space>
        </template>
      </n-card>
      <div class="basicForm">
        <n-form
          ref="formBasic"
          inline
          :label-width="180"
          :model="model"
          :rules="rules"
          :disabled="disabled"
          label-placement="left"
          require-mark-placement="right-hanging"
        >
        <!-- :cols="2"一行显示几个 -->
        <n-grid :x-gap="12" :y-gap="8" :cols="2">
          <n-grid-item>
            <n-form-item label="项目名称：" path="prjName">
              <n-input v-model:value="model.prjName" placeholder="输入项目名称" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="项目编码：" path="prjNo">
              <n-input v-model:value="model.prjNo" placeholder="输入项目编码" />
            </n-form-item>
          </n-grid-item>
        </n-grid>
        <!-- <n-form-item>
            <n-button attr-type="button" @click="handleValidateClick">
              验证
            </n-button>
          </n-form-item> -->
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {reactive,toRefs,ref,defineExpose,watch} from 'vue'
  import { useMessage } from 'naive-ui'
  const formBasic = ref()
  const model = reactive({
    prjName:'',
    prjNo:'',
  })

  defineProps({
    disabled:{
      type:Boolean,
      default:false,
    },
    type:{
      default:'add',
      type:String
    }
  })

  const rules = {
    prjName:{
      required:true,
      message:'请输入项目名称',
      trigger:'blur'
    },
    prjNo:{
      required:true,
      message:'请输入项目编码',
      trigger:'blur'
    },
  }

  const handleValidateClick =  async () => {
    await formBasic.value?.validate((errors:any) => {
      return errors
    })
  }
  defineExpose({handleValidateClick,model})
</script>

<style lang="scss" scoped>
.basicInfo{
  .title{
    font-size:16px;
    margin-bottom:30px;
  }
}
</style>