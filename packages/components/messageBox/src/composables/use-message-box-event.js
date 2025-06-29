import { types } from "@expresso-ui/utils"
export function useMessageBoxEvent({ props, visible, isLoading }){
  
  const useBeforeCancel = () => useClose()

  const useBeforeChange = () => {
    const isFunction = types().isFunction(props.beforeChange)
    if(isFunction) {
      isLoading.value = true
      props.beforeChange().then(() => {
        useClose()
      }).catch(() => {
        useClose()
      })
      return
    }
    useClose()
  }

  const useClose = () => visible.value = false

  return {
    useBeforeCancel,
    useBeforeChange,
    useClose
  }
}