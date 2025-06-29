import { useCheckboxState } from "./use-checkbox-state"
import { useCheckboxGroup } from "./use-checkbox-group"
import { useCheckboxModel } from "./use-checkbox-model"
import { useCheckboxEvent } from "./use-checkbox-event"

export function useCheckbox({ props, checkboxModel }){
    // useCheckboxGroup
    const { checkboxGroupKey, checkboxAllKey, isGroup, isAll } = useCheckboxGroup()
    // useCheckboxModel
    const { model } = useCheckboxModel({ props, checkboxModel, checkboxGroupKey, checkboxAllKey, isGroup, isAll })
    // useCheckboxState
    const { checkboxSize, isDisabled, isChecked, isLoading } = useCheckboxState({ props, model, checkboxGroupKey, isGroup })
    // useCheckboxEvent
    const { changeEvent, clickEvent } = useCheckboxEvent({ props, model, checkboxGroupKey, isGroup, isLoading, isDisabled })
    return {
        checkboxSize,
        isDisabled,
        isChecked,
        model,
        changeEvent,
        isLoading, 
        clickEvent
    }
}