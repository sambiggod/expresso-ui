<template>
<div :class="[ns.b()]">
  <div :class="ns.e('label')">
    <Checkbox all v-model="checkAll" :indeterminate="indeterminate" @change="handleAll" :size="size">全选</Checkbox>
  </div>
  <div :class="ns.e('wrapper')">
    <CheckboxGroup v-model="allModel" :size="size">
      <slot />
    </CheckboxGroup>
  </div>
</div>
</template>
<script>export default { name: "a-checkbox-all" };</script>
<script setup>
import { toRefs, ref, provide } from "vue"
import { useNamespace } from '@expresso-ui/hook';
import Checkbox from "./checkbox.vue"
import CheckboxGroup from "./checkboxGroup.vue"
import { CHECKBOX_ALL_KEY } from "./constant"
const ns = useNamespace("checkbox-all");
// defineModel
const allModel  = defineModel({ type: Array, default: () => ([]) })
const checkAll = ref(false)
const indeterminate = ref(false)
/** emit */
const emit = defineEmits(['change'])
/** props */
const props = defineProps({
  size: {
    type: String,
    default: "default",
  }
});
const list = ref([])

const setValuesEvent = (val) => list.value.push(val)

const changeEvent = async (val) => {
  allModel.value = val
  changeAllEvent(val)
  emit('change', val)
}

const handleAll = (val) => {
  allModel.value = val ? list.value : []
  indeterminate.value = false
}

const changeAllEvent = (val) => {
  const checkedCount = val.length
  checkAll.value = checkedCount === list.value.length
  indeterminate.value = checkedCount > 0 && checkedCount !== list.value.length
}

provide(CHECKBOX_ALL_KEY, {
  ...toRefs(props),
  allModel,
  changeEvent,
  setValuesEvent
})
</script>
