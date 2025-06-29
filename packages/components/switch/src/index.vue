<template>
<div :class="[ns.b()]" @click="handleSwitch">
  <div :class="[ns.e('input'), ns.m('size', size), ns.m(type), ns.is('checked', isChecked), ns.is('disabled', isDisabled || isLoading)]">
    <input type="checkbox" v-model="modelValue" :checked="isChecked" :disabled="isDisabled" />
    <span :class="ns.e('handel')">
      <button type="button" :class="[ns.e('button'), ns.is('checked', isChecked), ns.is('disabled', isDisabled || isLoading)]">
        <template v-if="isLoading">
          <a-icon><Loading :class="[ns.is('loading-transition', isLoading)]" /></a-icon>
        </template>
        <template v-else>
          <template v-if="centerIcon">
            <a-icon v-if="checkedIcon && isChecked"><component :is="checkedIcon" /></a-icon>
            <a-icon v-if="uncheckedIcon && !isChecked"><component :is="uncheckedIcon" /></a-icon>
          </template>
        </template>
      </button>
      <span :class="[ns.e('inner'), transitionModule]" v-if="!centerIcon">
        <span :class="[ns.e('inner-checked'), ns.is('checked', isChecked)]">
          <span v-if="checkedText">{{ firstChatAt(checkedText) }}</span>
          <a-icon v-if="checkedIcon"><component :is="checkedIcon" /></a-icon>
        </span>
        <span :class="[ns.e('inner-unchecked'), ns.is('checked', !isChecked)]">
          <span v-if="uncheckedText">{{ firstChatAt(uncheckedText) }}</span>
          <a-icon v-if="uncheckedIcon"><component :is="uncheckedIcon" /></a-icon>
        </span>
      </span>
    </span>
  </div>
</div>
</template>
<script>export default { name: "a-switch" };</script>
<script setup>
import { computed, ref } from "vue"
import { types } from "@expresso-ui/utils";
import { useNamespace } from '@expresso-ui/hook';
import { AIcon } from "@expresso-ui/components"
import { Loading } from "@expresso-ui/icons"
const ns = useNamespace("switch");
/** model */
const modelValue = defineModel()
/** emit */
const emit = defineEmits(['change'])
/** props */
const props = defineProps({
  type: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'default'
  },
  checkedText: {
    type: String,
    default: ''
  },
  uncheckedText: {
    type: String,
    default: ''
  },
  checkedIcon: {
    type: [String, Object],
    default: ''
  },
  uncheckedIcon: {
    type: [String, Object],
    default: ''
  },
  checkedValue: {
    type: [Boolean, String, Number],
    default: true
  },
  uncheckedValue: {
    type: [Boolean, String, Number],
    default: false
  },
  checkedText: {
    type: String,
    default: 'scale'
  },
  centerIcon: Boolean,
  disabled: Boolean,
  beforeChange: [Function, Promise],
  transition: {
    type: String,
    default: 'scale'
  },
})

/** 禁用 */
const isDisabled = computed(() => props.disabled)

/** 首个文本 */
const firstChatAt = (val) => {
  const value = val.trim()
  return value ? value.charAt(0) : ''
}

/** isLoading */
const isLoading = ref(false)

/** 图标动画模式 */
const transitionModule = computed(() => `transition-${props.transition}`)

/** 选中 */
const isChecked = computed(() => modelValue.value === props.checkedValue)

/** 点击事件 */
const handleSwitch = () => {
  if(isDisabled.value || isLoading.value) { return }
  /** 不是异步 */
  const { beforeChange } = props
  if(!beforeChange) {
    changeEvent()
    return
  }
  /** 判断Promise对象 */
  const isPromise = types().isPromise(beforeChange())
  if(!isPromise) { return flase }
  isLoading.value = true
  beforeChange(props?.params).then(() => {
    changeEvent()
    isLoading.value = false
  }).catch(() => {
    isLoading.value = false
  })
}

const changeEvent = () => {
  const val = isChecked.value ? props.uncheckedValue : props.checkedValue
  modelValue.value = val
  emit('change', val)
}



</script>