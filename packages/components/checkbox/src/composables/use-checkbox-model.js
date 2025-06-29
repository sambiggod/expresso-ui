import { computed } from "vue"
export function useCheckboxModel({ props, checkboxModel, checkboxGroupKey, isGroup, checkboxAllKey, isAll }){
/**
 * model
 */
  const model = computed({
    get(){
      return isGroup ? checkboxGroupKey.groupModel.value : checkboxModel?.value
    },
    set(val){
      if (isGroup && Array.isArray(val)) {
        checkboxGroupKey?.changeEvent?.(val)
        checkboxAllKey?.changeEvent?.(val)
      } else{
        checkboxModel.value = val
      }
    }
      
  })

  isAll && !props.all && checkboxAllKey?.setValuesEvent?.(props.value)

  return {
    model
  }
}