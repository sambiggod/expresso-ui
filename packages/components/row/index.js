import { componentInstall } from "@expresso-ui/utils"
import Row from "./src/index.vue"
// 提供按需加载的方式
export const ARow = componentInstall(Row)
// 导出组件
export default ARow
