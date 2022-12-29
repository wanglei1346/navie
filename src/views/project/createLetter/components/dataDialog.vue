<template>
  <div style="margin-top:30px">
    <n-space vertical>
      <n-steps :current="current" :status="currentStatus">
        <n-step
          title="上传文件"
        />
        <n-step
          title="导入数据"
        />
        <n-step
          title="导入完成"
        />
      </n-steps>
      <div v-if="current == 1">
        <div class="downloadFile">
          <div class="img">
            <n-icon size="48" :depth="3">
              <CloudDownloadOutline />
            </n-icon>
           </div>
          <div class="contentTip">
            <p class="head-title">请填写导入数据信息</p>
            <p>请按照数据模板的格式准备导入数据，模板中的表头名称不可更改，表头行不能删除</p>
            <n-button quaternary type="info" @click="downloadTemplate">下载模板</n-button>
          </div>
        </div>
        <div class="uploadFile">
          <div class="img">
            <n-icon size="48" :depth="3">
              <CloudUploadOutline />
            </n-icon>
          </div>
          <div class="contentTip">
            <p class="head-title">上传填写好的信息表</p>
            <p>文件后缀名必须为xls 或xlsx （即Excel格式），文件大小不得大于100M，最多支持导入1000条数据</p>
            <!-- <n-button @click="next">next</n-button> -->
            <!--  :default-upload="false"  :on-update:file-list="updateFileList" -->
            <!--  :on-finish="onFinish" -->
            <n-upload
              ref="uploadRef"
              action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
              :default-upload="false" 
              :on-before-upload="beforeUpload"
              :custom-request="customRequest"
              :on-update:file-list="updateFileList"
              :file-list="fileList"
            >
              <n-button quaternary type="info">上传文件</n-button>
            </n-upload>
          </div>
        </div>
        <p class="tip">特别提示：导入过程中请勿关闭页面</p>
      </div>
      <div v-else-if="current == 2" style="margin-top:30px;text-align: center;">
        <h5>
          <!-- 数据导入中... -->
          {{msgTip}}
        </h5>
        <!-- <n-progress
          type="line"
          :percentage="percent"
          :indicator-placement="'inside'"
          processing
        /> -->
      </div>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
 import {ref,reactive,toRefs,defineProps, defineEmits} from 'vue'
 import { StepsProps,UploadCustomRequestOptions,UploadInst,UploadFileInfo } from 'naive-ui'
 import { ArchiveOutline as ArchiveIcon,CloudUploadOutline,CloudDownloadOutline } from '@vicons/ionicons5'
 import download from "@/utils/download"
import Project from '@/api/project'
import { emit } from 'process'
 const currentStatus = ref<StepsProps['status']>('process')
const uploadRef = ref<UploadInst | null>(null)
// import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'

const emit = defineEmits(['next','successup','uploadevent','failup'])
const state = reactive({
  fileList: <any>[],
})
const {fileList} = toRefs(state)

type IProps = {
  current: number,
  percent:number,
  msgTip:String
}

const prop = defineProps<IProps>()

const downloadTemplate = ()=>{
  download("/conf-analysis/template-download", {prjId:1}, "post")
}
const UploadTemplate = ()=>{

}

// 文件上传前
const beforeUpload = (file:any,fileList:any)=>{
  const type = file.file?.name.split('.')[1]
  const is1M = file.size / 1024 / 1024;
  if (type != 'xls' && type != 'xlsx' && type != 'XLS') {
      window.$message.warning('只能上传格式为xls或xlsx的文件，请重新上传')
      return false
  }
  if(is1M > 100){
    window.$message.warning("大小不能超过100M");
    return false
  }
    emit('uploadevent',uploadRef.value)
    return true
}
const updateFileList = (fileList: UploadFileInfo[])=>{
  if (fileList.length > 0) {
    state.fileList = [fileList[fileList.length - 1]]  
  }
}
// 自定义上传 file
const customRequest = async ({file}: UploadCustomRequestOptions)=>{
  let formData = new FormData()
  formData.append('prjId','1')
  formData.append('file',file.file as File)
  const {data:{success}}= await Project.ExcelImport(formData)
  if(success){
    emit('successup')
  }else{
    emit('failup')
  }
}

// const onFinish = ()=>{
//   console.log('完成')
// }
</script>

<style lang="scss" scoped>
.tip{
    color:red;
    margin-top:30px;
    font-size:13px;
  }
.downloadFile,.uploadFile{
  margin-top:20px;
  display: flex;
  min-height: 120px;
  border: 1px solid rgb(247, 243, 243);
  padding:10px;
  .img{
    width:15%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .contentTip{
    display: flex;
    flex-direction: column;
    justify-content:space-evenly;
    align-items: baseline;
    .head-title{
      font-size: 15px;
      font-weight: 600;
    }
    :deep.n-button{
      padding-left:0px;
    }
  }
}
</style>