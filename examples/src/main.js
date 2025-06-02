import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { EButton } from '../../packages'
import ExpressoUI from '../../packages'
// 全量引入
import '@expresso-ui/theme/theme/index.scss'
// 按需引入
import '@expresso-ui/theme/src/button.scss'

const app = createApp(App)

app.use(EButton).mount('#app')
