<template>
  <header :class="[ns.b()]" :style="[styleHeight, styleBgColor]">
    <slot />
  </header>
</template>
<script>export default { name: "a-header" };</script>
<script setup>
import { computed } from "vue"
import { useNamespace } from '@expresso-ui/hook';
const ns = useNamespace("header");
/** props */
const props = defineProps({
  height: {
    type: String,
    default: '60px'
  },
  bgColor: {
    type: String,
    default: ''
  }
});

const styleHeight = computed(() => {
  return { height: props.height }
})
const styleBgColor = computed(() => {
  return props.bgColor ? { 'background-color': props.bgColor } : {}
})
</script>
