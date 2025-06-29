import { useMessageBoxEvent } from "./use-message-box-event"
import { useMessageBoxState } from "./use-message-box-state"
export function useMessageBox({ props, visible }){
    const { isLoading } = useMessageBoxState({ props })
    const { useBeforeCancel, useBeforeChange, useClose } = useMessageBoxEvent({ props, visible, isLoading })
    return {
        useBeforeCancel, 
        useBeforeChange,
        useClose, 
        isLoading
    }
}