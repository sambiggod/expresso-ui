import { componentInstall } from "@expresso-ui/utils"
import Checkbox from "./src/checkbox.vue"
import CheckboxGroup from "./src/checkboxGroup.vue"
import CheckboxAll from "./src/checkboxAll.vue"
// 提供按需加载的方式
export const ACheckbox = componentInstall(Checkbox)
export const ACheckboxGroup = componentInstall(CheckboxGroup)
export const ACheckboxAll = componentInstall(CheckboxAll)
// 导出组件
export default {
    Checkbox, CheckboxGroup, CheckboxAll
}
