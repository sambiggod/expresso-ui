<template>
<form :class="[ns.b()]">
  <slot />
</form>
</template>
<script>export default { name: "a-form" };</script>
<script setup>
import { toRefs, provide } from "vue"
import { FORM_KEY } from "./constant"
import { useNamespace } from '@expresso-ui/hook';
const ns = useNamespace("form");
const props = defineProps({
  model: {
    type: Object,
    default: () => ({})
  },
  rules: {
    type: Object,
    default: () => ({})
  },
  labelWidth: {
    type: String,
    default: ''
  },
  align: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  }
})
// 所有字段
const modelFields = []
const pushField = (context) => modelFields.push(context)

/**
 * 校验
 */
const validate = async (fields) => {
  // validateFields
  const validateFields = filterFields(fields) || modelFields
  let verificationError = [];
  for(const field of validateFields) {
    try {
      await field.validate()
    } catch (fields) {
      verificationError = [...verificationError, ...fields]
    }
  }
  if(!verificationError.length) return true
  return Promise.reject(verificationError)
}

/**
 * 重置
 */
const reset = () => {
  const validateFields = modelFields
  for(const field of validateFields) {
    field?.resetField()
  }
}

// 过滤需要校验的字段
const filterFields = (fields) => {
  if(!fields) { return null }
  const fieldArr = modelFields.filter((v) => fields.includes(v.prop))
  return !!fieldArr.length ? fieldArr : null
}


provide(FORM_KEY, {...toRefs(props), pushField})

defineExpose({ 
  validate,
  reset
})
</script>
