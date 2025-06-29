import { componentInstall } from "@expresso-ui/utils"
import Col from "./src/index.vue"
// 提供按需加载的方式
export const ACol = componentInstall(Col)
// 导出组件
export default ACol
