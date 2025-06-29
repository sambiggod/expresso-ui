<template>
  <section :class="[ns.b(), ns.is('vertical', isVertical)]">
    <slot />
  </section>
</template>
<script>export default { name: "a-container" };</script>
<script setup>
import { computed, useSlots } from "vue"
import { useNamespace } from '@expresso-ui/hook';
const ns = useNamespace("container");
// slots
const slots = useSlots()
/** props */
const props = defineProps({
  direction: {
    type: String,
    default: ''
  }
});

const isVertical = computed(() => {
  if (props.direction === 'vertical') {
    return true
  }
  if (props.direction === 'horizontal') {
    return false
  }
  if(slots && slots.default) {
    const slotsNodes = slots.default()
    const tag = slotsNodes.some(nodes => ['a-header', 'a-footer'].includes(nodes.type.name))
    return tag
  }
  return false
})
</script>
