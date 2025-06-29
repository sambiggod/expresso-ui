import { componentInstall } from "@expresso-ui/utils"
import Container from "./src/container.vue"
import Aside from "./src/aside.vue"
import Header from "./src/header.vue"
import Footer from "./src/footer.vue"
import Main from "./src/main.vue"
// 提供按需加载的方式
export const AContainer = componentInstall(Container)
export const AAside = componentInstall(Aside)
export const AHeader = componentInstall(Header)
export const AFooter = componentInstall(Footer)
export const AMain = componentInstall(Main)
// 导出组件
export default { AContainer, AAside, AHeader, AFooter, AMain }