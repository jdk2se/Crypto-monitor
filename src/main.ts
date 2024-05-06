import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import vSelect from 'vue-select'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/routes.ts';

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App)
    .use(createPinia())
    .use(router)
    .component('v-select', vSelect)
    .mount('#app')
