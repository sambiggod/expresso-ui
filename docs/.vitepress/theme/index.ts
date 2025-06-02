import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Demo from '../components/demo/index.vue'
// import './highlight.scss'
import './style.css'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册组件
    app.component('Demo', Demo)
  }
}

export default theme satisfies Theme