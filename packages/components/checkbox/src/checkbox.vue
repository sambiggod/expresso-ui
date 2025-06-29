<template>
<component :is="tag" :class="[
    ns.b(), 
    ns.m(type), 
    ns.is('checked', isChecked || indeterminate), 
    ns.is('loading', isLoading), 
    ns.is('disabled', isDisabled || isLoading),
    ns.m('size', checkboxSize)
  ]"
  @click="clickEvent"
  >
  <span :class="[ns.e('wrapper')]">
    <input :class="[ns.e('input')]" type="checkbox" v-model="model" :value="value" :name="value" @change="changeEvent" @click.stop/>
    <span :class="[ns.e('inner'), ns.is('indeterminate', indeterminate)]">
      <template v-if="indeterminate">
        <i :class="[ns.e('indeterminate', indeterminate)]"></i>
      </template>
      <a-icon v-else>
        <Loading v-if="isLoading" :class="[`${ns.is('loading-transition', isLoading)}`]" />
        <Check v-else />
      </a-icon>
    </span>
  </span>
  <span :class="[ns.e('label')]"><slot /></span>
  </component>
</template>
<script>export default { name: "a-checkbox" };</script>
<script setup>
import { computed } from "vue"
import Aicon from "../../icon"
import { useCheckbox } from "./composables"
import { useNamespace, useParent } from '@expresso-ui/hook';
import { Check, Loading } from "@expresso-ui/icons"
const ns = useNamespace("checkbox");
const checkboxModel = defineModel()
const emit = defineEmits(['change'])
/** props */
const props = defineProps({
  value: {
    type: [String, Boolean, Number, Object],
    default: undefined,
  },
  tag: {
    type: String,
    default: "label",
  },
  type: {
    type: String,
    default: "default",
  },
  value: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  size: {
    type: String,
    default: "default",
  },
  checked: Boolean,
  disabled: Boolean,
  all: Boolean,
  indeterminate: Boolean,
  beforeChange: Function
});

const { checkboxSize, isDisabled, model, isChecked, isLoading, changeEvent, clickEvent } = useCheckbox({ props, checkboxModel })
</script>
