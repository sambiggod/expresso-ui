import { componentInstall } from '@expresso-ui/utils'
import Button from './src/index.vue'

// 提供按需加载的方式
export const EButton = componentInstall(Button)

// 导出组件
export default EButton