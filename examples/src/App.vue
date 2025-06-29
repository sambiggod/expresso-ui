<template>
  <a-button>默认</a-button>
  <a-button type="primary">主要</a-button>
  <a-button type="success">成功</a-button>
  <a-button type="warning">警告</a-button>
  <a-button type="danger">错误</a-button>
</template>
<script setup>
import { AButton } from 'azong';
import { ref, h } from "vue"
import { ADrawer, AModal } from "@expresso-ui/components";

const beforeChange = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
      open.value = false
    }, 2000)
  })
}

const open = ref(false)
</script>

<style lang="scss">
#app {
  height: 100vh;
}
body { 
  margin: 0; 
  padding: 0;
  height: 100vh;
}
.bg { width: 100%; height: 32px; }
.bg-odd { background-color: #CCD1DD; }
.bg-even { background-color: #E5E7EE; }
</style>
