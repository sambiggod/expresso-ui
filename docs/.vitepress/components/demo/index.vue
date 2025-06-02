<template>
    <div class="examples-container">
        <div class="description">
            <slot name="description"></slot>
        </div>
        <div class="examples-body">
            <div class="example-inner">
                <component :is="demo" />
            </div>
            <div class="source-inner">
                <slot name="source"></slot>
            </div>
        </div>
    </div>                
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import modules from '../../components.js'
import prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
const props = defineProps({
    path: {
        type: String,
        default: ''
    }
})
const demo = computed(() => {
    const key = `examples/${props.path}.vue`
    return modules[key]
})

onMounted(() => {
    prism.highlightAll()
})
</script>