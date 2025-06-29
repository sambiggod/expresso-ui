<template>
  <div :class="[ns.b(), ns.m('size', controlSize), ns.is('required', isRequired)]">
    <div :class="[ns.e('label')]" :style="[width]">
      <label v-if="label" :class="[ns.e('label-inner'), ns.is('colon', colon)]" :style="[textAlign]">{{ label }}</label>
    </div>
    <div :class="[ns.e('control')]">
      <div :class="[ns.e('control-inner')]"><slot /></div>
      <transition :name="`${ns.namespace}-form-message`">
        <div v-if="validateMessage" :class="[ns.e('message')]">{{ validateMessage }}</div>
      </transition>
    </div>
  </div>
</template>
<script>export default { name: "a-form-item" };</script>
<script setup>
import { ref, reactive, toRefs, computed, provide, onMounted } from "vue"
import { useNamespace, useStyle } from '@expresso-ui/hook';
import { FORM_ITEM_KEY } from "./constant"
import { useFormItem } from "./composables"
import AsyncValidator from 'async-validator'
const ns = useNamespace("form-item");
const uStyle = useStyle();
const { formContent } = useFormItem()

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  labelWidth: {
    type: String,
    default: ''
  },
  align: {
    type: String,
    default: ''
  },
  colon: {
    type: Boolean,
    default: true
  },
  prop: {
    type: String,
    default: ''
  },
  rules: {
    type: [Object, Array],
    default: () => ([])
  },
  required: Boolean
})

// 初始值 
let initValue = null

// 校验结果message
const validateMessage = ref('')

const width = computed(() => uStyle.width(formContent.labelWidth.value || props.labelWidth))
const textAlign = computed(() => uStyle.align(formContent.align.value || props.align))
const isRequired = computed(() => initRules.value.some((rule) => rule.required))
const controlSize = computed(() => formContent.size.value)
/** 转换为数组 */
const convertArray = (rules) => {
  return rules 
         ? Array.isArray(rules) ? rules : [rules] 
         : []
}
/** 校验规则集合 */
const initRules = computed(() => {
  const _rules = convertArray(props.rules)
  const formRules = formContent?.rules?.value
  if(formRules && props.prop) {
    const propRules = formRules[props.prop]
    propRules && _rules.push(...convertArray(propRules))
  }
  return _rules
})
/** 根据触发类型过滤规则 */
const filterRules = (trigger) => {
  const rules = initRules.value
  return rules.filter((rule) => {
    if (!rule.trigger || !trigger) return true
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger)
    } else {
      return rule.trigger === trigger
    }
  })
}

const validate =  (trigger) => {
  const rules = filterRules(trigger)
  // 获取key
  const propName = props.prop
  // 根据key获取校验规则
  const formModel = formContent?.model?.value 
  // 实例化
  const validator = new AsyncValidator({
    [propName]: rules
  })
  // 开始校验
  return validator.validate(
    {[propName]: formModel[propName]}, 
    { firstFields: true }
  ).then(() => {
    onalidateSuccess()
    return Promise.resolve()
  }).catch(({ errors, fields }) => {
    validateFailed(errors)
    return Promise.reject(errors)
  })
}

const onalidateSuccess = () => {
  validateMessage.value = ''
}

const validateFailed = (errors) => {
  validateMessage.value = errors?.[0].message
}

const resetField = () => {
  props.prop && (formContent.model.value[props.prop] = initValue)
}

const context = reactive({
  ...toRefs(props),
  validate,
  resetField
})
provide(FORM_ITEM_KEY, context)

onMounted(() => {
  if(props.prop) {
    formContent.pushField(context)
    initValue = formContent?.model?.value?.[props.prop]
  }
})
</script>
