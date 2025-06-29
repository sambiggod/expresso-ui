import { componentInstall } from "@expresso-ui/utils"
import Input from "./src/index.vue"
// 提供按需加载的方式
export const AInput = componentInstall(Input)
// 导出组件
export default AInput
