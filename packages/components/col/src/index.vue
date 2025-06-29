<template>
  <component :is="tag" :class="[ns.b(), classCol]" :style="[styleGutter]">
    <slot />
  </component>
</template>
<script>export default { name: "a-col" };</script>
<script setup>
import { computed } from "vue"
import { useNamespace, useParent } from '@expresso-ui/hook';
const ns = useNamespace("col");
const uParent = useParent("row")
/** props */
const props = defineProps({
  tag: {
    type: String,
    default: "div",
  },
  span: {
    type: [String, Number],
    default: '24'
  },
  offset: {
    type: Number,
    default: 0
  }
});

const classCol = computed(() => {
  // 样式组合
  let className = ns.b(props.span)
  // offset偏移
  const offset = props.offset ? ns.b(`offset-${props.offset}`) : false
  className = offset ? `${className} ${offset}` : className
  // 返回样式
  return [ns.b(), className]
})

const styleGutter = computed(() => {
  const gutter = uParent.props('gutter')
  const value = gutter ? gutter / 2 + 'px' : null
  return value ? { 'paddingLeft': value, 'paddingRight': value } : {}
})

</script>
