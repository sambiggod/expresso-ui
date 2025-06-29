import { componentInstall } from "@expresso-ui/utils"
import Drawer from "./src/index.vue"
// 提供按需加载的方式
export const ADrawer = componentInstall(Drawer)
// 导出组件
export default ADrawer