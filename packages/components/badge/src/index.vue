<template>
  <span :class="[ns.b()]">
    <span :class="[classNames, ns.e('content'), ns.m(type), ns.m('size', size), ns.is('dot', isDot)]" :style="[styleOpacity, styleBgColor, styleColor]">{{ isDot ? '' : content }}</span>
    <slot />
  </span>
</template>
<script>export default { name: "a-badge" };</script>
<script setup>
import { computed } from "vue"
import { useNamespace, useStyle } from '@expresso-ui/hook';
import { types } from "@expresso-ui/utils"
const ns = useNamespace("badge");
const s = useStyle()
/** props */
const props = defineProps({
  value: {
    type: [String, Number],
    default: ''
  },
  placement: {
    type: String,
    default: 'top-right'
  },
  type: {
    type: String,
    default: 'danger'
  },
  size: {
    type: String,
    default: 'default'
  },
  max: {
    type: Number,
    default: 99
  },
  color: {
    type: String,
    default: ''
  },
  bgColor: {
    type: String,
    default: ''
  },
  isDot: Boolean,
  opacity: {
    tyep: Number,
    default: 1
  },
  classNames: {
    type: String,
    default: ''
  }
});

const content = computed(() => {
  const value = types().isNumber(props.value)
  const max = types().isNumber(props.max)
  if(value && max) {
    return props.max < props.value ? `${props.max}+` : `${props.value}`
  }
  return props.value
})
const styleOpacity = computed(() => s.opacity(props.opacity))
const styleBgColor = computed(() => s.bgColor(props.bgColor))
const styleColor = computed(() => s.color(props.color))
</script>
