import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './assets/main.css';

const app = createApp(App)

createApp(App).use(store).use(router).mount('#app')
