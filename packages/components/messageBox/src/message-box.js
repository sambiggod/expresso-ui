export const messageBoxProps = {
    title: { type: String, default: '' },
    content: { type: [String, Object], default: '' },
    icon: { type: String, default: 'warning' },
    footer: { type: Boolean, default: true },
    cancelButtonText: { type: String, default: '取消' },
    cancelButtonShow: { type: Boolean, default: true },
    confirmButtonText: { type: String, default: '确定' },
    confirmButtonShow: { type: Boolean, default: true },
    confirmLoading: Boolean,
    unmountOnClose: Boolean,
    beforeClose: Function,
    beforeChange: Function,
    onclose: Function
}