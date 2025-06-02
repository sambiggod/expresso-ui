<template>
    <div class="examples-container">
        <!-- 描述 -->
        <div class="description">
            <slot name="description"></slot>
        </div>
        <!-- 演示主体 -->
        <div class="examples-body">
            <!-- 组件渲染 -->
            <div class="example-inner">
                <component :is="demo" />
            </div>
            <!-- 图标 -->
            <ul class="examples-control">
                <li @click="onCopy" @mouseleave="isCopySuccess = ''">
                    <i class="iconfont" :class="iconCopy"></i>
                </li>
                <li @click="toggleSource">
                    <i class="iconfont icon-daima"></i>
                </li>
            </ul>
            <!-- 源码 -->
            <div class="source-inner">
                <slot name="source"></slot>
            </div>
        </div>
    </div>                
</template>
<script setup lang="ts">
import { computed, onMounted, ref, useSlots, nextTick } from 'vue'
import modules from '../../components.js'
import prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import Clipboard from 'clipboard'

const props = defineProps({
    path: {
        type: String,
        default: ''
    }
})

const slots = useSlots()
const source = ref(false)
const isCopySuccess = ref('')

const iconCopy = computed(() => {
    if (isCopySuccess.value === true) {
        return 'icon-chenggong1'
    }
    if (isCopySuccess.value === false) {
        return 'icon-chahao'
    }
    return 'icon-fuzhi-line'
})

const onCopy = async (event: Event) => {
    const clipboard = new Clipboard(event.target, {
        text: () => slots.source()[0]?.children[0]?.children
    })
    clipboard.on('success', () => {
        isCopySuccess.value = true
        clipboard.destroy()
    })
    clipboard.on('error', () => {
        isCopySuccess.value = false
        clipboard.destroy()
    })
    clipboard.onClick(event)
}

const toggleSource = () => {
    source.value = !source.value
    source.value && nextTick(() => prism.highlightAll())
}

const demo = computed(() => {
    const key = `examples/${props.path}.vue`
    return modules[key]
})

onMounted(() => {
    prism.highlightAll()
})
</script>