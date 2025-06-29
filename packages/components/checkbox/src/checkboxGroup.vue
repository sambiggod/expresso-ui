<template>
  <div :class="[ns.b()]">
    <slot />
  </div>
</template>
<script>export default { name: "a-checkbox-group" };</script>
<script setup>
import { provide, toRefs, nextTick } from "vue";
import { CHECKBOX_GROUP_KEY } from "./constant"
import { useNamespace } from '@expresso-ui/hook';
const ns = useNamespace("checkbox-group");
// model
const groupModel = defineModel({ 
  type: Array, 
  default: () => ([])
})
const emit = defineEmits(['change'])
/**
 * props
 */
const props = defineProps({
  size: {
    type: String,
    default: 'default'
  },
  beforeChange: Function
})

// changeEvent
const changeEvent = async (value) => {
  groupModel.value = value
  emit('change', value)
}

provide(CHECKBOX_GROUP_KEY, {
  ...toRefs(props),
  groupModel,
  changeEvent
})
</script>
