import { computed, ref } from "vue"
import { types } from "@expresso-ui/utils"
export function useCheckboxState({ props, model, checkboxGroupKey, isGroup }){
  /**
   * loading
   */
  const isLoading = ref(false)
  /**
   * size
   */
  const checkboxSize = computed(() => isGroup ? checkboxGroupKey?.size.value : props.size)

  /**
   * disalbed
   */
  const isDisabled = computed(() => props.disabled)

  /**
   * checked
   */
  const isChecked = computed(() => {
    const value = model.value
    // Boolean
    if(types().isBoolean(value)) {
      return value
    }
    // Array
    if(types().isArray(value)){
      return value.includes(props.value)
    }
    return false
  })

  return {
    checkboxSize,
    isDisabled,
    isChecked,
    isLoading
  }
}