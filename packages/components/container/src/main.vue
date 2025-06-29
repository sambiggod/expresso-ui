<template>
  <main :class="[ns.b()]" :style="[styleBgColor]">
    <slot />
  </main>
</template>
<script>export default { name: "a-main" };</script>
<script setup>
import { computed } from "vue"
import { useNamespace } from '@expresso-ui/hook';
const ns = useNamespace("main");
/** props */
const props = defineProps({
  bgColor: {
    type: String,
    default: ''
  }
});
const styleBgColor = computed(() => {
  return props.bgColor ? { 'background-color': props.bgColor } : {}
})
</script>
