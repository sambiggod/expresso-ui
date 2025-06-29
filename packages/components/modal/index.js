import { componentInstall } from "@expresso-ui/utils"
import Modal from "./src/index.vue"
// 提供按需加载的方式
export const AModal = componentInstall(Modal)
// 导出组件
export default AModal