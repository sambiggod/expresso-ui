<template>
    <a-button round>默认</a-button>
    <a-button type="primary" round>主要</a-button>
    <a-button type="success" round>成功</a-button>
    <a-button type="warning" round>警告</a-button>
    <a-button type="danger" round :before-change="handlerChange">错误</a-button>
</template>

<script setup>
const handlerChange = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 2000)
    })
}
</script>