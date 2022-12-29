<template>
  <div>
    <n-card
    :segmented="{
      content: true,
    }"
    :bordered="false"
  >
    <template #header>
      <n-space>
        <span>函证类型 </span>
      </n-space>
    </template>
  </n-card>
      <n-space vertical>
          <n-form
            ref="formRef"
            :model="model"
            label-placement="left"
            :label-width="160"
            :style="{
              maxWidth: '640px'
            }"
          >
            <n-form-item label="银行询证函：" path="radioGroupValue">
              <n-radio-group v-model:value="model.radioGroupValue" name="radiogroup2">
                <n-radio value="1">
                  银行询证函
                </n-radio>
              </n-radio-group>
            </n-form-item>
            <n-form-item label="往来询证函：" path="Letterconfirmation">
              <n-radio-group v-model:value="model.Letterconfirmation" name="radiogroup2" disabled>
                <n-radio value="1">
                  往来询证函
                </n-radio>
                <n-radio value="2">
                  往来交易询证函
                </n-radio>
                <n-radio value="3">
                  往来明细询证函
                </n-radio>
              </n-radio-group>
            </n-form-item>
            <n-form-item label="其他询证函" path="Otherconfirmation">
              <n-radio-group v-model:value="model.Otherconfirmation" name="radiogroup2" disabled>
                <n-radio value="1">
                  自定义函证
                </n-radio>
              </n-radio-group>
            </n-form-item>
          </n-form>
          <div class="brnGroup">
            <!-- <n-button type="primary" size="large" @click="ImportTemplate">
              函证模板导入
            </n-button> -->
            <n-button type="primary" size="large" @click="fillInManually">
              手动填写数据
            </n-button>
            <n-button size="large" @click="router.go(-1)">
              取消
            </n-button>
          </div>
      </n-space>
  </div>
</template>

<script lang="ts" setup>
  import {reactive,toRefs,h,ref} from 'vue'
  import {useRouter,useRoute} from 'vue-router'
  import DataDialog from './components/dataDialog.vue'
  import { NRadio, NRadioGroup, NSpace, StepsProps,UploadInst } from 'naive-ui'
import { values } from 'lodash';

  // const currentRef= ref<number | null>(1)
  // const currents = currentRef
  const route = useRoute()
  const state = reactive({
    model:{
      radioGroupValue:'1',
      Letterconfirmation:'1',
      Otherconfirmation:'1'
    },
    current:1,
    percent:0,
    uploadInfo:ref<UploadInst | null>(null),
    msgTip:'数据导入中',
    radioValue:1
  })

  // const current = reactive({
  //   value:1
  // })
  const {model} = toRefs(state)
  const router = useRouter()
  // const num = 1
  // 导入模板
  // const ImportTemplate = ()=>{
  //     state.current = 1
  //     window.$dialog.success({
  //     title: "数据导入",
  //     content: () => h(
  //       DataDialog,
  //      {
  //       // 传递值
  //       current:state.current,
  //       percent:state.percent,
  //       msgTip:state.msgTip,
  //       onSuccessup:()=>{
  //         state.current=3
  //       },
  //       onFailup:()=>{
  //         state.msgTip = '导入失败'
  //       },
  //       onNext:(param:any)=>{
  //         console.log(param,'111331')
  //       },
  //       onUploadevent:(param:any)=>{
  //         state.uploadInfo = param
  //       }
  //     }, {

  //     }),
  //     positiveText: '下一步',
  //     maskClosable:false,
  //     // negativeText: "取消",
  //     onPositiveClick: () => {
  //         if(state.current == 1 && !state.uploadInfo){
  //           state.current =1
  //         }else{
  //           state.current+=1
  //           if(state.current ==2){
  //             state.uploadInfo?.submit()
  //             state.uploadInfo=null
  //           }
  //         }
  //         if(state.msgTip == '导入失败' && state.current == 3){
  //           return true
  //         }
  //         if(state.current == 2 || state.current == 1) {
  //           return false
  //         }
  //     },
  //     onNegativeClick: () => {
  //       // window.$message.error("不确定")
  //     },
  //     onAfterEnter:()=>{
  //       console.log('AfterEnter')
  //     }
  //   })
  // }
  // 手动填写数据
  const fillInManually = ()=>{
    router.push({ path: `/letterInfo/edit/${route.query.prjId}/${route.query.prjName}/${route.query.prjNo}` })
    // let list = [
    //   {
    //     lable:"银行函证（格式1）",
    //     value:1
    //   },
    //   {
    //     lable:"银行函证（格式2）",
    //     value:2
    //   },
    //   {
    //     lable:"银行函证（验资）",
    //     value:3
    //   }
    // ]
    // window.$dialog.success({
    //   title: "选择格式",
    //   content: () => h(
    //     NRadioGroup,{
    //       value:1,
    //       name:'radiogroup',
    //       "on-update:value":(value:any)=>{
    //         console.log(value,typeof(value),'valu22e')
    //       }
    //     },{
    //       default:()=>h(
    //         NSpace,{
    //         },{
    //           default:()=> list.map((item:any,index:number)=>{
    //               return h(NRadio,{
    //                 value:item.value,
    //                 key:item.value,
    //               }, 
    //               { default: () => item.lable }
    //               )
    //             })
    //         })
    //     }
    //   ),
    //   positiveText: '确认',
    //   maskClosable:false,
    //   negativeText: "取消",
    //   onPositiveClick: () => {
    //     router.push({ path: `/letterInfo/edit/${route.query.prjId}/${route.query.prjName}/${route.query.prjNo}` })
    //   },
    //   onNegativeClick: () => {
    //   },
    //   onAfterEnter:()=>{
    //     console.log('AfterEnter')
    //   }
    // })
  }
</script>

<style lang="scss" scoped>
.title{
    font-size:16px;
    margin-bottom:30px;
  }
  .brnGroup{
    margin-left: 80px;
    :deep .n-button{
      margin-right:20px;
    }
  }

  :deep.n-dialog.n-modal{
    width:100% !important;
  }
</style>