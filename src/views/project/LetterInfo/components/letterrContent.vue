<template>
  <div>
    <div>
     <p>
        <span class="title">{{index}}.{{(content as any).title}}</span>
        <n-switch v-model:value="(content as any).switch" />
        <n-data-table
          v-if="(content as any).switch"
          v-bind="$attrs"
          :columns="(content as any).column"
          :data="(content as any).data"
        />
        <div style="margin-top:20px" align="right" v-show="(content as any).switch">
          <n-button type="primary" @click="addDataColumn">增加</n-button>
        </div>
     </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import {reactive,toRefs} from "vue"
//  const state = reactive({
  
//   data:[]
//  })
 
//  const {active,data} = toRefs(state)

 const props = defineProps({
  content:{
    type:Object
  },
  index:{
    type:Number
  },
})

const addDataColumn = ()=>{
  (props as any).content.data.push({
    account:'',
    biz:'',
    code:'',
    lvss:'',
    yhannoum:''
  })
}
</script>

<style lang="scss" scoped>
  p{
    margin-left:100px;
    .title{
      font-size:16px;
      margin-bottom:30px;
      display: inline-block;
      margin-right: 10px;
    }
  }
  
</style>