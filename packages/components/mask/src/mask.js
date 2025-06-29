import { createVNode, defineComponent, h, renderSlot, ref } from 'vue'
import { useNamespace, zIndex } from '@expresso-ui/hook';
import { useZindex } from "@expresso-ui/hook"
export default defineComponent({
  name: "a-mask",
  props: {
    mask: {
      type: Boolean,
      default: true
    },
    maskClose: {
      type: Boolean,
      default: true
    }
  },
  setup(props, {emit,  slots }){
    const ns = useNamespace("mask");
    const { nextZindex, currentZindex } = useZindex()
    nextZindex()
    // 关闭事件
    const onClose = () => {
      if(!props.maskClose) { return }
      emit('close')
    }
    return () => {
      return createVNode('div', 
        {
          class: [ns.b()],
          style: [{zIndex: currentZindex.value}]
        },
        [
          h('span', { 
            class: props.mask ? ns.e('wrap') : '',
            onClick: () => onClose()
          }),
          renderSlot(slots, 'default')
        ]
      )
    }
  }
})


