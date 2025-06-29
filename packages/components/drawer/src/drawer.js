export const drawerProps = {
    title: { type: String, default: '' },
    footer: { type: Boolean, default: true },
    placement: { type: String, default: 'right' },
    cancelButtonText: { type: String, default: '取消' },
    cancelButtonShow: { type: Boolean, default: true },
    confirmButtonText: { type: String, default: '确定' },
    confirmButtonShow: { type: Boolean, default: true },
    confirmLoading: Boolean,
    unmountOnClose: Boolean,
    fixedScreen: Boolean,
    beforeClose: Function,
    beforeChange: Function,
    size: {
        type: String,
        default: '410px'
    }
}