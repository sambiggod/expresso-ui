<template>
  <i :class="[ns.b()]" :style="[styleSize, styleColor]">
    <slot />
  </i>
</template>
<script>export default { name: "a-icon" };</script>
<script setup>
import { computed } from "vue"
import { useNamespace, useStyle } from '@expresso-ui/hook';
const ns = useNamespace("icon");
const uStyle = useStyle();
/** props */
const props = defineProps({
  size: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  }
});
const styleSize = computed(() => uStyle.fontSize(props.size))
const styleColor = computed(() => uStyle.color(props.color))
</script>