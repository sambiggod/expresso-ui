<template>
  <footer :class="[ns.b()]" :style="[styleHeight, styleBgColor]">
    <slot />
  </footer>
</template>
<script>export default { name: "a-footer" };</script>
<script setup>
import { computed } from "vue"
import { useNamespace } from '@expresso-ui/hook';
const ns = useNamespace("footer");
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
