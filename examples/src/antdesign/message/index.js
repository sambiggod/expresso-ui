import { createVNode, render } from 'vue'
import MessageConstructor from './message.vue'

const createMessage = () => {
  const container = document.createElement('div')
  const appendTo = document.body;

  const vm = createVNode(MessageConstructor, {
    id: '10',
    message: '消息',
    duration: 2000,
    topOffset: 0,
    // 组件销毁时触发的回调
    onDestroy() {
      // render(null, container);
      // container.remove();
    },
    // 组件关闭时触发的回调
    // 这个回调用于显示组件的移出动画，和 onDestroy 不冲突
    onClose() {}
  })
  // 渲染组件到 container 上
  render(vm, container);
  // 添加 container 到 body
  appendTo.appendChild(container);
}







const message = {
  show: () => {
    createMessage()
  }
}

export default message