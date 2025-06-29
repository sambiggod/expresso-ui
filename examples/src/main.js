import { createApp, getCurrentInstance } from 'vue'
import './style.css'
import App from './App.vue'
import UILibrary from "@expresso-ui/components";
import "@expresso-ui/theme"
const app = createApp(App)
app.use(UI)
app.mount('#app')
