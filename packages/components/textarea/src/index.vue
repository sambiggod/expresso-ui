<template>
  <div :style="[styleWidth]" :class="[ns.b()]" @mouseenter="mouseenterEvent" @mouseleave="mouselevelEvent">
    <textarea 
      ref="_ref"
      @input="handlerInput" 
      @focus="focusEvent"
      @blur="blurEvent"
      @compositionstart="compositionStartEvent"
      @compositionupdate="compositionUpdateEvent"
      @compositionend="handlerCompositionEnd"
      @change="changeEvent"
      @keydown="keydownEvent"
      @keyup="keyupEvent"
      :rows="rows"
      :placeholder="placeholder"
      :value="modelValue" 
      :disabled="disabled" 
      :maxlength="maxlength"
      :class="[ns.e('inner'), ns.is('color-danger', isColorDanger), ns.is('focus', isFocus), ns.is('disabled', disabled)]" 
    />
    <div v-if="showLimit" :class="[ns.e('count')]">{{ valueLength }} / {{ maxlength }}</div>
  </div>
</template>
<script>export default { name: "a-textarea" };</script>
<script setup>
import { ref, computed, shallowRef } from "vue"
import { useNamespace, useStyle, useEvent, useExpose } from '@expresso-ui/hook';
const ns = useNamespace("textarea");
// input
const _ref = shallowRef(null)
const { focusExpose, blurExpose, selectExpose } = useExpose(_ref)
// event
const { isFocus, isComposition, focusEvent, blurEvent, mouseenterEvent, mouselevelEvent, compositionStartEvent, compositionUpdateEvent, compositionEndEvent, changeEvent, keydownEvent, keyupEvent } = useEvent()
// style
const uStyle = useStyle();
const styleWidth = computed(() => uStyle.width(props.width))
// defineModel
const modelValue = defineModel()
// emits
const emit = defineEmits(['input', 'clear', 'focus', 'blur', 'mouseenter', 'mouselevel', 'compositionstart', 'compositionupdate', 'compositionend', 'change', 'keydown', 'keyup'])
/** props */
const props = defineProps({
  placeholder: {
    type: String,
    default: '请输入'
  },
  maxlength: {
    type: [String, Number],
    default: ''
  },
  width: { 
    type: String, 
    default: "" 
  },
  rows: {
    type: String,
    default: ''
  },
  disabled: Boolean, // 禁用
  count: Boolean, // 统计
});
// showLimit
const showLimit = computed(() => props.count && !props.disabled && props.maxlength)
// 文本长度
const valueLength = computed(() => modelValue.value.length)
const isColorDanger = computed(() => {
  return props.maxlength && props.count && valueLength.value > props.maxlength
})

// 清除
const handlerClear = () => {
  modelValue.value = ''
  // emit input
  emit('input', '')
  emit('clear', '')
}

const handlerCompositionEnd = (e) => {
  compositionEndEvent(e).then(() => {
    handlerInput(e)
  })
}

const handlerInput = (e) => {
  if(isComposition.value) { return false }
  const value = e.target.value
  modelValue.value = value
  // emit input
  emit('input', value, e)
}

defineExpose({
  ref: _ref, // 输入框对象
  focus: focusExpose,
  blur: blurExpose,
  select: selectExpose,
  clear: handlerClear
})

</script>