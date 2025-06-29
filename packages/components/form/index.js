import { componentInstall } from "@expresso-ui/utils"
import Form from "./src/form.vue"
import FormItem from "./src/formItem.vue"
// 提供按需加载的方式
export const AForm = componentInstall(Form)
export const AFormItem = componentInstall(FormItem)
// composables
export * from "./src/composables"
// 导出组件
export default { AForm, FormItem }
