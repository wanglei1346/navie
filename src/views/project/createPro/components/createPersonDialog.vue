<template>
  <div>
    <n-space>
      <n-select
        v-model:value="departValue"
        filterable
        placeholder="选择部门"
        :options="departmentList"
        label-field="orgName"
        value-field="orgCode"
        @update:value="handleUpdateValue"
      />
      <n-select
        style="width:500px"
        v-model:value="personValue"
        multiple
        filterable
        placeholder="选择人员"
        label-field="userAccount"
        value-field="userId"
        :options="personList"
        @update:value="handlePersonValue"
      />
    </n-space>
  </div>
</template>

<script lang="ts" setup>
  import { reactive ,toRefs,defineEmits,defineProps,watch } from 'vue'
  const emit = defineEmits(['update','updateper'])
  // const personValue:any
  // const departValue
  const state = reactive({
    personValue:[],
    departValue:''
  })
  const {personValue,departValue} = toRefs(state)
  const props = defineProps({
    // personValue:{
    //   type:Array
    // },
    departmentList:{
      type:Array,
      default:()=>[]
    },
    // departValue:{
    //   type:String
    // },
    personList:{
      type:Array,
      default:()=>[]
    }
  })
const handleUpdateValue = (value:string)=>{
  emit('update',value)
}
const handlePersonValue = (value:string)=>{
  emit('updateper',value)
}

</script>

<style lang="scss" scoped>

</style>