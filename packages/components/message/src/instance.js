import { shallowReactive } from 'vue'
// message实例
export const messageInstances = shallowReactive([])

// 获取实例对象（当前的和上一个）
export const getInstance = (id) => {
    const index = messageInstances.findIndex(item => item.id === id)
    // 当前实例
    const current = messageInstances[index]
    // 上一个实例
    let prev = index > 0 ? messageInstances[index - 1] : null
    return { current, prev }
}

// 获取上一个实例对象的偏移
export const getPrevBottomOffset = (id) => {
    const { prev } = getInstance(id)
    // 如果不存在，则为0
    if(!prev) { return 0 }
    return prev.vm.setupState?.bottomPosition
}