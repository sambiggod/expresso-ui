<template>
  <transition :name="ns.b()">
    <a-mask v-show="visible" v-bind="$attrs" @close="useClose">
      <div :class="[ns.b()]">
        <div :class="[ns.e('wrap')]">
          <div :class="[ns.e('body')]">
            <div :class="[ns.e('header')]">
              <a-icon :class="[ns.m(theme)]"><component :is="icon" /></a-icon>
              <div :class="[ns.e('title')]">{{ title }}</div>
            </div>
            <div :class="[ns.e('content')]">
              <template v-if="isString">{{ content }}</template>
              <component v-if="isVNodeDom" :is="content" />
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
</template>
<script>export default { name: "a-message-box" };</script>
<script setup>
import { onMounted, computed, isVNode } from "vue"
import { useNamespace } from '@expresso-ui/hook';
import { typeIcon, themeType, types } from "@expresso-ui/utils"
import { AMask, AButton, AIcon } from "@expresso-ui/components"
import { Close } from "@expresso-ui/icons"
import { useMessageBox } from "./composables/use-message-box"
import { messageBoxProps } from "./message-box"
const props = defineProps(messageBoxProps)
const emit = defineEmits(['ok', 'cancel', 'open', 'opened', 'close', 'closed'])
const ns = useNamespace("message-box");
const visible = defineModel()
const { useBeforeCancel, useBeforeChange, useClose, isLoading } = useMessageBox({props, visible})

// icon
const icon = computed(() => typeIcon[props.icon])
const theme = computed(() => themeType?.[props.icon] || props.icon)

// isString
const isString = computed(() => types().isString(props.content))
const isVNodeDom = computed(() => isVNode(props.content))

onMounted(() => {
    visible.value = true
})
</script>