import { componentInstall } from "@expresso-ui/utils"
import Textarea from "./src/index.vue"
// 提供按需加载的方式
export const ATextarea = componentInstall(Textarea)
// 导出组件
export default ATextarea