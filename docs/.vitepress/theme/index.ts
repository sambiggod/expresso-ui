// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import Deom from "../components/demo/index.vue"
// UI组件库
import UILibrary from "@expresso-ui/components"
import "@expresso-ui/theme"
import './style.css'
import './highlight.scss'
import './iconfont/iconfont.css'
import './table.scss'
export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('Demo', Deom)
    app.use(UILibrary)
  }
} satisfies Theme
