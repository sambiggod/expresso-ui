<template>
  <transition name="fade" @before-leave="onClose" @after-leave="onDestroy">
    <div :style="{ top: topOffset + 'px' }" class="message" v-if="visiable">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    topOffset: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 3000,
    },
    id: {
      type: Number,
      required: true,
    },
    onDestroy: {
      type: Function,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      visiable: false,
    };
  },
  methods: {
    close() {
      this.visiable = false;
    },
  },
  mounted() {
    this.visiable = true;
    // setTimeout(() => {
    //   this.close();
    // }, this.duration);
  },
};
</script>

<style scoped>
.message {
  position: fixed;
  left: 50%;
  transform: translate(-50%, 10px);
  background-color: burlywood;
  padding: 0.5rem;
  width: 300px;
  z-index: 10001;
  transition: top 0.4s;
}

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.4s, opacity 0.4s;
}

.fade-enter-from {
  transform: translate(-50%, 0);
  opacity: 0;
}


.fade-leave-to {
  transform: translate(-50%, -10px) !important;
  opacity: 0;
}
</style>
