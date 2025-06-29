<template>
<transition :name="ns.b()" @leave="onClose" @after-leave="onUnmount">
    <div ref="messageRef" 
        :class="[ns.b(), ns.m(theme), ns.is('background', background)]" 
        :style="[customStyle]" 
        v-show="visible"
        @mouseenter="onMouseEnter"
        @mouseleave="startTime"
    >
        <div :class="[ns.e('icon')]"><a-icon><component :is="icon" /></a-icon></div>
        <div :class="[ns.e('content')]">{{ content }} - {{ currentZindex }}</div>
        <div :class="[ns.e('close')]"  @click.stop="close" v-if="showClose"><a-icon><component :is="typeIcon['close']" /></a-icon></div>
    </div>
</transition>
</template>
<script>export default { name: "AlMessage" };</script>
<script setup>
import { computed, ref, onMounted } from "vue"
import { useNamespace, useStyle } from '@expresso-ui/hook';
import { tryOnBeforeUnmount, useResizeObserver, useTimeoutFn } from '@vueuse/core'
import { AIcon } from "@expresso-ui/components"
import { typeIcon, themeType } from "@expresso-ui/utils"
import { getPrevBottomOffset } from "./instance"
import { useZindex } from "@expresso-ui/hook";
const ns = useNamespace("message");
const { nextZindex, currentZindex } = useZindex()

const uStyle = useStyle();
/** props */
const props = defineProps({
    type: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        default: ""
    },
    offset: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        default: "",
    },
    duration: {
        type: Number,
        default: 3000
    },
    onClose: Function,
    onUnmount: Function,
    showClose: Boolean,
    background: Boolean
});

const visible = ref(false)
const messageRef = ref(null)
const height = ref(0)

// 上一个message
const prevButtonPosition = computed(() => getPrevBottomOffset(props.id))
// 偏移更新
const offsetTop = computed(() => {
  return props.offset + prevButtonPosition.value
})
// 底部到可视区顶部的距离
const bottomPosition = computed(() => height.value + offsetTop.value)
// 自定义样式
const customStyle = computed(() => {
    return { 
        top: offsetTop.value + 'px',
        zIndex: currentZindex.value
    }
})
// icon
const icon = computed(() => typeIcon[props.type])
const theme = computed(() => themeType?.[props.type] || props.type)


const startTime = async () => {
  if(props.duration === 0) { return false }
  ;({ stop } = useTimeoutFn(() => {
    close()
  }, props.duration))
}

const onMouseEnter = () => stop?.()

const close = () => visible.value = false

onMounted(() => {
    visible.value = true
    nextZindex()
    startTime()
})

useResizeObserver(messageRef, (entries) => {
  const entry = entries[0]
  height.value = entry.contentRect.height
})
</script>