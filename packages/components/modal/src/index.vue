<template>
<teleport to="body">
  <transition 
    :name="ns.b()"
    @before-enter="useBeforeEnter"
    @enter="useEnter"
    @after-enter="useAfterEnter"
    @before-leave="useBeforeLeave"
    @after-leave="useAfterLeave"
  >
    <a-mask v-show="visible" v-bind="$attrs" @close="useClose">
      <div :class="[ns.b(), ns.is('fixed-screen', fixedScreen)]" :style="[width]">
        <div :class="[ns.e('wrap')]">
          <div :class="[ns.e('header')]">
            <h4 :class="[ns.e('title')]">{{ title }}</h4>
            <a-icon :class="[ns.e('close')]" @click="useClose"><Close /></a-icon>
          </div>
          <div :class="[ns.e('body')]">
            <div :class="[ns.e('render-content')]" v-if="rendered">
              <slot />
            </div>
          </div>
          <div :class="[ns.e('footer')]" v-if="footer">
            <template v-if="$slots.footer"><slot name="footer" /></template>
            <template v-else>
              <a-button text size="large" v-if="cancelButtonShow" @click="useBeforeCancel">{{ cancelButtonText }}</a-button>
              <a-button type="primary" size="large" v-if="confirmButtonShow" :loading="isLoading" @click="useBeforeChange">{{ confirmButtonText }}</a-button>
            </template>
          </div>
        </div>
      </div>
    </a-mask>
  </transition>
</teleport>
</template>
<script>export default { name: "a-modal" };</script>
<script setup>
import { useNamespace } from '@expresso-ui/hook';
import { AMask, AButton, AIcon } from "@expresso-ui/components"
import { Close } from "@expresso-ui/icons"
import { useModal } from "./composables/use-modal"
import { modalProps } from "./modal"
const props = defineProps(modalProps)
const emit = defineEmits(['ok', 'cancel', 'open', 'opened', 'close', 'closed'])
const ns = useNamespace("modal");
const visible = defineModel()
const { 
  useBeforeCancel, 
  useBeforeChange, 
  useClose, 
  isLoading,
  useBeforeEnter,
  useEnter,
  useAfterEnter,
  useBeforeLeave,
  useAfterLeave,
  rendered,
  width
} = useModal({props, visible})
</script>