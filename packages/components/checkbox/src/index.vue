<template>
  <component :is="tag" :class="[ns.b(), ns.is('disabled', true)]">
    <span :class="[ns.e('input-wrapper')]">
      <input :class="[ns.e('input')]" type="checkbox" value="111" />
      <span :class="[ns.e('inner')]"></span>
    </span>
    <span><slot /></span>
  </component>
</template>
<script>export default { name: "a-checkbox" };</script>
<script setup>
import { computed } from "vue"
import { useNamespace, useParent } from '@expresso-ui/hook';
const ns = useNamespace("checkbox");
/** props */
const props = defineProps({
  tag: {
    type: String,
    default: "label",
  }
});
</script>
