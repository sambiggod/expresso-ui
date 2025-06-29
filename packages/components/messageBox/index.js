import Method from "./src/method"
import { functionInstall } from "@expresso-ui/utils"
// 提供按需加载的方式
export const AMessageBox = functionInstall(Method, '$messageBox')
// 导出组件
export default AMessageBox
