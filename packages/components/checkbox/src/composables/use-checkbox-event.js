import { computed, getCurrentInstance } from "vue"
import { types } from "@expresso-ui/utils"
export function useCheckboxEvent({ props, model, checkboxGroupKey, isDisabled, isGroup, isLoading }){
  const { emit } = getCurrentInstance()
  /**
   * change
   */
  const changeEvent =  (e) => emit('change', e.target.checked, e)
  /**
   * beforeChange
   */
  const beforeChange = computed(() => isGroup ? checkboxGroupKey?.beforeChange?.value : props.beforeChange)
  /**
   * 是否beforeChagen
   */
  const isBeforeChange = computed(() => types().isFunction(beforeChange.value))
  /**
   * click
   */
  const clickEvent = (e) => {
    if(isBeforeChange.value || isDisabled.value || isLoading.value) {
      const ev = e || window.event
      ev.preventDefault();
      if(isBeforeChange.value && !isDisabled.value && !isLoading.value) {
        isLoading.value = true
        beforeChange.value().then(() => {
          updateData()
          isLoading.value = false
        }).catch(() => {
          isLoading.value = false
        })
      }
    }
  }

  /**
   * 数据处理
   */
  const updateData = () => {
    if(isGroup){
      const index = model.value.findIndex(v => v === props.value)
      (index !== -1) ? model.value.splice(index, 1) : model.value.push(props.value)
    }else{
      model.value = !model.value
    }
  }
  

  return {
    changeEvent,
    clickEvent
  }
}