import { ref, getCurrentInstance } from "vue"
export const useEvent = (options = {}) => {
  let isFocus = ref(false)
  let isHover = ref(false)
  let isComposition = ref(false)
  // emit 
  const { emit } = getCurrentInstance()
  // change
  const changeEvent = (e) => {
    emit('change', e)
  }
  // 键盘事件
  const keydownEvent = (e) => {
    emit('keydown', e)
  }
  const keyupEvent = (e) => {
    emit('keyup', e)
  }
  // 获取焦点
  const focusEvent = (e) => {
    isFocus.value = true
    emit('focus', e)
  }
  // 失去焦点
  const blurEvent = (e) => {
    isFocus.value = false
    emit('blur', e)
    options?.afterBlur?.() // 失焦后
  }
  // 移入事件
  const mouseenterEvent = (e) => {
    isHover.value = true
    emit('mouseenter', e)
  }
  // 移出事件
  const mouselevelEvent = (e) => {
    isHover.value = false
    emit('mouselevel', e)
  }
  /**
   * 输入法事件
   */
  // 开始
  const compositionStartEvent = (e) => {
    isComposition.value = true
    emit('compositionstart', e)
  }
  // 更新
  const compositionUpdateEvent = (e) => {
    isComposition.value = true
    emit('compositionupdate', e)
  }
  // 结束
  const compositionEndEvent = (e) => {
    emit('compositionend', e)
    return new Promise((resolve, reject) => {
      if(isComposition.value) {
        isComposition.value = false
        resolve()
        return false
      }
      reject()
    })
  }
  return {
    focusEvent,
    blurEvent,
    mouseenterEvent,
    mouselevelEvent,
    compositionStartEvent, 
    compositionUpdateEvent, 
    compositionEndEvent,
    changeEvent,
    keydownEvent,
    keyupEvent,
    isFocus,
    isHover,
    isComposition
  }
}