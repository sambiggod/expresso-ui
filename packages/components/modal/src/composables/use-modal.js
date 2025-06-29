import { ref, getCurrentInstance, computed } from "vue"
import { useModalEvent } from "./use-modal-event"
import { useModalState } from "./use-modal-state"
import { useStyle } from "@expresso-ui/hook"
export function useModal({ props, visible }){
    const uStyle = useStyle()
    const rendered = ref(false)
    const { emit } = getCurrentInstance()
    const { isLoading } = useModalState({ props })
    const { useBeforeCancel, useBeforeChange, useClose } = useModalEvent({ props, visible, isLoading })
    const useBeforeEnter = () => {
        rendered.value = true
    }
    // 进入动画
    const useEnter = () => emit('open')
    // 进入动画完成后
    const useAfterEnter = () => emit('opened')
    // 离开之前
    const useBeforeLeave = () => emit('close')
    // 离开动画完成后
    const useAfterLeave = () => {
        props.unmountOnClose && (rendered.value = false)
        emit('closed')
    }
    // 宽度
    const width = computed(() => {
        return uStyle.width(props.width)
    })

    return {
        useBeforeCancel, 
        useBeforeChange,
        useClose, 
        useEnter,
        useBeforeEnter,
        useAfterEnter,
        useBeforeLeave,
        useAfterLeave,
        isLoading,
        rendered,
        width
    }
}