import { createApp } from 'vue';
import App from './app.vue';
import expresso-ui from '@expresso-ui/components';
const app = createApp(App);
app.use(expresso-ui);
app.mount('#app');
