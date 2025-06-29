import { ref, getCurrentInstance, computed } from "vue"
import { useDrawerEvent } from "./use-drawer-event"
import { useDrawerState } from "./use-drawer-state"
import { useStyle } from "@expresso-ui/hook"
export function useDrawer({ props, visible }){
    const uStyle = useStyle()
    const rendered = ref(false)
    const { emit } = getCurrentInstance()
    const { isLoading } = useDrawerState({ props })
    const { useBeforeCancel, useBeforeChange, useClose } = useDrawerEvent({ props, visible, isLoading })
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
    // 尺寸
    const size = computed(() => {
        if(['left', 'right'].includes(props.placement)) {
            return uStyle.width(props.size)
        }
        if(['top', 'bottom'].includes(props.placement)) {
            return uStyle.height(props.size)
        }
    })
    // 偏移
    const offset = computed(() => {
        return visible.value ? '' : props.placement
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
        size,
        offset
    }
}