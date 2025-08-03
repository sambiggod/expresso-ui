import { createApp } from 'vue';
import App from './app.vue';
import expressoui from '@expresso-ui/components';
const app = createApp(App);
app.use(expressoui);
app.mount('#app');
