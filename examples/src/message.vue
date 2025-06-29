<template>
    <div>{{ content }}</div>
</template>

<script setup>
const props = defineProps({
    content: { type: String, default: '' }
})
</script>
