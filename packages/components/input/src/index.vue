<template>
  <div 
    :style="[styleWidth]" 
    :class="[ns.b(), 
    ns.is('focus', isFocus), 
    ns.is('disabled', disabled), 
    ns.m('size', controlSize), 
    ns.is('round', round)]"
    @mouseenter="mouseenterEvent"
    @mouseleave="mouselevelEvent"
  >
    <!-- 前置 -->
    <div v-if="isPrepend" :class="[ns.e('aside-wrapper')]">
      <div :class="[ns.e('prepend'), (prepend || append || isPrepend || isAppend) && ns.e('aside')]">
        <slot v-if="$slots.prepend" name="prepend" />
        <div v-if="prepend">{{ prepend }}</div>
      </div>
    </div>
    <div :class="[ns.e('wrapper'), ns.is('aside-prepend', isPrepend), ns.is('aside-append', isAppend)]">
      <!-- 前缀 -->
      <div v-if="isPrefix" :class="[ns.e('fix-wrapper')]">
        <div :class="[ns.e('fix'), ns.e('prefix')]">
          <span v-if="prefix">{{ prefix }}</span>
          <a-icon v-if="prefixIcon"><component :is="prefixIcon" /></a-icon>
          <a-icon v-if="prefixIconfont"><i class="iconfont" :class="prefixIconfont"></i></a-icon>
        </div>
      </div>
      <input 
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
        :value="modelValue" 
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type" 
        :disabled="disabled" 
        :class="[ns.e('inner'), ns.is('color-danger', isColorError)]" 
        :placeholder="placeholder" 
        :maxlength="maxlength"
      />
      <!-- 后缀 -->
      <div v-if="isSuffix" :class="[ns.e('fix-wrapper')]">
        <div :class="[ns.e('fix'), ns.e('suffix')]">
          <template v-if="!showPassword || !showClear || !showLimit">
            <span v-if="suffix">{{ suffix }}</span>
            <a-icon v-if="suffixIcon"><component :is="suffixIcon" /></a-icon>
            <a-icon v-if="suffixIconfont">
              <i class="iconfont" :class="suffixIconfont"></i>
            </a-icon>
          </template>
          <a-icon v-if="showPassword" class="pointer" @click="passwordVisible = !passwordVisible">
            <component :is="passwordIcon" />
          </a-icon>
          <a-icon v-if="showClear" class="pointer" @click="handlerClear">
            <component :is="ClearFill" />
          </a-icon>
          <div v-if="showLimit" :class="[ns.e('count')]">{{ valueLength }} / {{ maxlength }}</div>
        </div>
      </div>
    </div>
    <!-- 后置 -->
    <div v-if="isAppend" :class="[ns.e('aside-wrapper')]">
      <div :class="[ns.e('append'), (prepend || append || isPrepend || isAppend) && ns.e('aside')]">
        <slot v-if="$slots.append" name="append" />
        <div v-if="append">{{ append }}</div>
      </div>
    </div>
  </div>
</template>
<script>export default { name: "a-input" };</script>
<script setup>
import { ref, computed, useSlots, shallowRef, watch } from "vue"
import { useNamespace, useStyle, useEvent, useExpose } from '@expresso-ui/hook';
import { AIcon, useFormItem } from "@expresso-ui/components"
import { Show, Hide, ClearFill } from "@expresso-ui/icons"
// useFormItem
const { formContent, formItemContent } = useFormItem()
// input
const _ref = shallowRef(null)
const { focusExpose, blurExpose, selectExpose } = useExpose(_ref)
const ns = useNamespace("input");
const slots = useSlots()
// event
const { isFocus, isBlur, isHover, isComposition, focusEvent, blurEvent, mouseenterEvent, mouselevelEvent, compositionStartEvent, compositionUpdateEvent, compositionEndEvent, changeEvent, keydownEvent, keyupEvent } = useEvent({
  // 失焦后
  afterBlur(){
    props.validateEvent && formItemContent?.validate('blur')
  }
})
// style
const uStyle = useStyle();
// defineModel
let modelValue = defineModel()
// emits
const emit = defineEmits(['input', 'clear', 'focus', 'blur', 'mouseenter', 'mouselevel', 'compositionstart', 'compositionupdate', 'compositionend', 'change', 'keydown', 'keyup'])
/** props */
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: '请输入'
  },
  maxlength: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: "",
  },
  width: { 
    type: String, 
    default: "" 
  },
  disabled: Boolean, // 禁用
  round: Boolean, // 圆角
  showPassword: Boolean, // 密码
  clearance: Boolean, // 清除
  count: Boolean,     // 统计
  prefixIcon: {
    type: [String, Object],
    default: ''
  },
  suffixIcon: {
    type: [String, Object],
    default: ''
  },
  prepend: {
    type: String,
    default: ''
  },
  append: {
    type: String,
    default: ''
  },
  prefixIconfont: {
    type: String,
    default: ''
  },
  suffixIconfont: {
    type: String,
    default: ''
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  validateEvent: {
    type: Boolean,
    default: true
  }
});
const styleWidth = computed(() => uStyle.width(props.width))
// ref
const passwordVisible = ref(false)
// passwordIcon
const passwordIcon = computed(() => {
  return passwordVisible.value ? Show : Hide
})
// clearIcon
const showClear = computed(() => {
  return props.clearance && modelValue.value && !props.disabled && props.type === 'text'
})
// showLimit
const showLimit = computed(() => props.count && !props.disabled && props.maxlength)
// 文本长度
const valueLength = computed(() => modelValue.value.length)
const isColorError = computed(() => {
  return props.maxlength && props.count && valueLength.value > props.maxlength
})
// 是否有前置、后置内容
const isAside = computed(() => {
  return isPrepend.value || isAppend.value
})
// 前置内容
const isPrepend = computed(() => {
  return slots.prepend || props.prepend
})
// 后置内容
const isAppend = computed(() => {
  return slots.append || props.append
})
const isPrefix = computed(() => {
  return props.prefixIcon || props.prefixIconfont || props.prefix
})
const isSuffix = computed(() => {
  return props.suffixIcon || props.suffixIconfont || props.suffix || props.showPassword || showClear.value || showLimit.value
})
const controlSize = computed(() => formContent?.size?.value || props?.size)

const handlerCompositionEnd = (e) => {
  compositionEndEvent(e).then(() => {
    handlerInput(e)
  })
}

const handlerInput = (e) => {
  const value = e.target.value
  modelValue.value = value
  // emit input
  emit('input', value, e)
}

// 清除
const handlerClear = () => {
  modelValue.value = ''
  emit('input', '')
  emit('clear')
  focusExpose()
}

watch(() => modelValue.value, () => {
  props.validateEvent && formItemContent?.validate('change')
})

defineExpose({
  ref: _ref, // 输入框对象
  focus: focusExpose,
  blur: blurExpose,
  select: selectExpose,
  clear: handlerClear
})
</script>