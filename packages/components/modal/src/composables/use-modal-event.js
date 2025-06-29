import { getCurrentInstance } from "vue"
import { types } from "@expresso-ui/utils"
export function useModalEvent({ props, visible, isLoading }){
  const { emit } = getCurrentInstance()
  const useBeforeCancel = () => {
    useClose()
    emit('cancel')
  }

  const useBeforeChange = () => {
    const isFunction = types().isFunction(props.beforeChange)
    if(isFunction) {
      isLoading.value = true
      props.beforeChange().then(() => {
        isLoading.value = false
        emit('ok')
      }).catch(() => {
        isLoading.value = false
      })
      return
    }
    emit('ok')
  }

  const useClose = () => {
    visible.value = false
  }

  return {
    useBeforeCancel,
    useBeforeChange,
    useClose
  }
}