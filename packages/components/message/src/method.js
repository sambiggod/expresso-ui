import { createVNode, render } from 'vue'
import { types } from '@expresso-ui/utils'
import MessageNode from "./message.vue"
import { messageInstances } from "./instance"
// 主题类型
const messageTheme = ['info', 'success', 'warning', 'error']
/** 默认属性 */
const messageDefaults = {
  type: 'info',
  content: '',
  offset: 16,
  duration: 3000,
  onClose: null,
  onUnmount: null,
  showClose: false
}
/** id */
let onlyId = 0;

/** 初始化配置 */
const initOptions = (params) => {
  // message类型：string，vnode
  const options = !params || types().isString(params) ? { message: params } : params
  // 配置
  const config = {
    ...messageDefaults,
    ...options
  }
  return config
}

const createMessage = (options = {}) => {
  const container = document.createElement('div');
  const appendTo = document.body;
  // id 唯一值
  const id = `message_${onlyId++}`
  // 提供自定义关闭动作回调
  const userOnClose = options.onClose
  const vnode = createVNode(
    MessageNode, 
    {
      ...options,
      id,
      onClose(){
        userOnClose?.()
        closeMessage(instance)
      },
      onUnmount(){
        render(null, container);
      }
    }
  )
  // 渲染组件到 container 上
  render(vnode, container);
  // 添加 container 到 body
  appendTo.appendChild(container.firstElementChild);
  // 获取组件对象
  const vm = vnode.component
  const instance = {
    id,
    vnode,
    vm,
    handler: {
      close: () => {
        vm.setupState.visible = false
      }
    },
    props: vm.props,
  }
  return instance
}


const closeMessage = (instance) => {
  const idx = messageInstances.indexOf(instance)
  if (idx === -1) return
  messageInstances.splice(idx, 1)
  instance?.handler.close()
}

/** 
 * 关闭所有
 */
export function closeAll() {
  for (const instance of messageInstances) {
    instance.handler.close()
  }
}

const message = (params = {}) => {
  const normalized = initOptions(params)
  const message = createMessage(normalized)
  messageInstances.push(message)
}

messageTheme.forEach(theme => {
  message[theme] = (options = {}) => {
    const config = initOptions(options)
    return message({...config, type: theme})
  }
})

message.closeAll = closeAll

export default message;