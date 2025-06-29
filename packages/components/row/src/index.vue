<template>
  <component :is="tag" :class="[ns.b(), ns.is(`justify-${justify}`, !!justify)]" :style="[styleMargin, styleGap]">
    <slot />
  </component>
</template>
<script>export default { name: "a-row" };</script>
<script setup>
import { computed } from "vue"
import { useNamespace } from '@expresso-ui/hook';
const ns = useNamespace("row");
/** props */
const props = defineProps({
  tag: {
    type: String,
    default: "div",
  },
  gutter: {
    type: Number,
    default: 0
  },
  justify: {
    type: String,
    default: ''
  },
  gap: {
    type: Number,
    default: 0
  }
});

const styleMargin = computed(() => {
  const gutter = props.gutter
  const value = gutter ? -gutter / 2 + 'px' : null
  return value ? { 'marginLeft': value, 'marginRight': value } : {}
})

const styleGap = computed(() => {
  return props.gap ? { 'row-gap': `${props.gap}px`} : {}
})

</script>
