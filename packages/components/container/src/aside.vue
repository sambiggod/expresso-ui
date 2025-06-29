<template>
  <aside :class="[ns.b()]" :style="[styleWidth, styleBgColor]">
    <slot />
  </aside>
</template>
<script>export default { name: "a-aside" };</script>
<script setup>
import { computed } from "vue"
import { useNamespace } from '@expresso-ui/hook';
const ns = useNamespace("aside");
/** props */
const props = defineProps({
  width: {
    type: String,
    default: '200px'
  },
  bgColor: {
    type: String,
    default: ""
  }
});
const styleWidth = computed(() => {
  return { width: props.width }
})
const styleBgColor = computed(() => {
  return props.bgColor ? { 'background-color': props.bgColor } : {}
})
</script>
