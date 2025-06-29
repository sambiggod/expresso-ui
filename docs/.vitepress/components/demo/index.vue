<template>
<div class="examples-container">
    <!-- 描述 -->
    <div class="description"><slot name="description" /></div>
    <!-- 演示主体 -->
    <div class="examples-body">
        <!-- 组件渲染 -->
        <div class="examples-inner"><component :is="demo" /></div>
        <!-- 控制元素 -->
        <ul class="examples-control">
            <li @click="copy" @mouseleave="isCopySuccess = ''">
                <label class="icon-popup-label">{{ iconCopy.text }}代码</label>
                <i class="iconfont" :class="iconCopy.icon"></i>
            </li>
            <li @click="toggleSource">
                <label class="icon-popup-label">{{ source ? '收起' : '显示'}}代码</label>
                <i class="iconfont icon-daima"></i>
            </li>
        </ul>
        <!-- 组件源码 -->
        <div v-if="source" class="source-inner"><slot name="source" /></div>
    </div>
</div>
</template>
<script setup>
import { computed, onMounted, ref, useSlots, nextTick } from "vue"
import modules from "../../components"
import Clipboard from 'clipboard'
import prism from 'prismjs'
import "prismjs/themes/prism-tomorrow.min.css"
const slots = useSlots()
const props = defineProps({
    path: {
        type: String,
        default: ''
    }
})

const source = ref(false)
const isCopySuccess = ref('')

const demo = computed(() => {
    const key = `examples/${props.path}.vue`
    return modules[key];
});

const iconCopy = computed(() => {
    if(isCopySuccess.value === true) { 
        return {
            icon: 'icon-chenggong1',
            text: '成功'
        }
    }
    if(isCopySuccess.value === false) { 
        return {
            icon: 'icon-chahao',
            text: '失败'
        }
    }
    return {
        icon: 'icon-fuzhi_line',
        text: '复制'
    }
})

const copy = async (event) => {
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

onMounted(() => {
    
})
</script>
<style lang="scss" scoped>
.examples-body {
    border: 1px solid #f0f0f0;
    border-radius: 12px;
}
.examples-inner {
    padding: 24px;
}
.examples-control {
    text-align: center;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px dashed #f0f0f0;
    margin: 0;
    li {
        position: relative;
        list-style: none;
        width: 35px;
        text-align: center;
        margin-top: 0;
        &:hover {
            .icon-popup-label { transform: translateX(-50%) scale(1); }
        }
    }
    i {
        opacity: .5;
        cursor: pointer;
        transition: all .1s ease 0s;
        font-size: 16px;
        &:hover {
            opacity: 1;
            font-size: 17px;
        }
    }
}
.icon-popup-label {
    display: block;
    position: absolute;
    left: 50%;
    bottom: 115%;
    font-size: 14px;
    color: #fff;
    padding: 8px 10px;
    border-radius: 2px;
    transform: translateX(-50%) scale(0);
    transition: .1s;
    background-color: rgba(0, 0, 0, .7);
    white-space: nowrap;
    line-height: 1;
    &:before {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-top: 5px solid rgba(0, 0, 0, .7);
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
    }
}
</style>
