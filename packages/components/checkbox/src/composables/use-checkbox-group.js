import { inject } from "vue"
import { CHECKBOX_GROUP_KEY, CHECKBOX_ALL_KEY } from "../constant"
export function useCheckboxGroup(){
  // checkboxGroup数据
  const checkboxGroupKey = inject(CHECKBOX_GROUP_KEY, undefined)
  const checkboxAllKey = inject(CHECKBOX_ALL_KEY, undefined)
  // checkboxGroup是否存在
  const isGroup = checkboxGroupKey !== undefined
  const isAll = checkboxAllKey !== undefined
  return {
    checkboxGroupKey,
    checkboxAllKey,
    isGroup,
    isAll
  }
}