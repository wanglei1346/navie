<template>
  <div>
    <n-form
      ref="formRef"
      inline
      label-placement="left"
      :label-width="120"
      :model="form"
    >
      <n-grid :collapsed="gridCollapsed" :collapsed-rows="1" :cols="4">
        <n-gi v-for="formItem in formOption">
          <n-form-item :label="formItem.label" :path="formItem.key">
            <n-input
              v-model:value="form[formItem.key]"
              :placeholder="formItem.placeholder"
              v-if="formItem.type === 'input'"
            />
            <n-select
              v-model:value="form[formItem.key]"
              :placeholder="formItem.placeholder"
              :options="formItem.options"
              v-if="formItem.type === 'select'"
            />
            <n-date-picker
              v-model:value="form[formItem.key]"
              v-if="formItem.type === 'daterange'"
              type="daterange"
              clearable
            />
          </n-form-item>
        </n-gi>
        <n-gi suffix class="suffix" #="{ overflow }">
          <n-space style="padding-left: 25px">
            <n-button type="info" attr-type="submit" @click="query">
              查询
            </n-button>
            <n-button attr-type="reset" @click="reset"> 重置 </n-button>
            <n-button
              text
              @click="gridCollapsed = !gridCollapsed"
              v-if="
                (gridCollapsed && overflow) || (!gridCollapsed && !overflow)
              "
              style="display: flex; align-items: center; height: 100%"
            >
              {{ overflow ? "展开" : "收起" }}
              <n-icon size="20">
                <CaretUpSharp v-show="!overflow" />
                <CaretDownSharp v-show="overflow" />
              </n-icon>
            </n-button>
          </n-space>
        </n-gi>
      </n-grid>
    </n-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue"
import moment from "moment"
import { CaretUpSharp, CaretDownSharp } from "@vicons/ionicons5"
const emit = defineEmits(["query"])
const gridCollapsed = ref(true)
const form = reactive({})
const formRef = ref()
const removeEmptyField = (obj: any) => {
  var newObj = {}
  if (typeof obj == "string") {
    obj = JSON.parse(obj)
  }
  if (obj instanceof Array) {
    newObj = []
  }
  if (obj instanceof Object) {
    for (var attr in obj) {
      if (
        obj.hasOwnProperty(attr) &&
        obj[attr] !== "" &&
        obj[attr] !== null &&
        obj[attr] !== undefined
      ) {
        if (obj[attr] instanceof Object) {
          newObj[attr] = removeEmptyField(obj[attr])
        } else if (
          typeof obj[attr] == "string" &&
          ((obj[attr].indexOf("{") > -1 && obj[attr].indexOf("}") > -1) ||
            (obj[attr].indexOf("[") > -1 && obj[attr].indexOf("]") > -1))
        ) {
          try {
            var attrObj = JSON.parse(obj[attr])
            if (attrObj instanceof Object) {
              newObj[attr] = removeEmptyField(attrObj)
            }
          } catch (e) {
            newObj[attr] = obj[attr]
          }
        } else {
          newObj[attr] = obj[attr]
        }
      }
    }
  }
  return newObj
}
const submitFieldsAdaptor = (values: any) => {
  const result = Object.assign({}, values)
  Object.keys(result).forEach((key) => {
    if (values[key] instanceof Array) {
      const keys = key.split("$")
      keys.forEach((_key, _index) => {
        result[_key] = moment(values[key][_index]).format("YYYY-MM-DD")
      })
      delete result[key]
    }
    if (moment.isMoment(values[key])) {
      result[key] = moment(values[key]).format("YYYY-MM-DD")
    }
  })
  return removeEmptyField(result)
}
const reset = () => {
  resetFields()
  emit("query", submitFieldsAdaptor(form))
}
const resetFields = () => {
  for (let key in form) {
    form[key] = null
  }
}
const query = () => {
  emit("query", submitFieldsAdaptor(form))
}
type Props = {
  formOption: Components.IFormOption[]
}
defineProps<Props>()
defineExpose({ resetFields })
</script>
<style lang="scss" scoped></style>
