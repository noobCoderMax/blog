import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'animate.css';

//element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createPinia } from "pinia"
// 数据持久化插件
import piniaPersist from 'pinia-plugin-persist'
const pinia = createPinia()
pinia.use(piniaPersist)

// 无边框electron
// import { BrowserWindow } from 'electron'
// const win = new BrowserWindow({ frame: false })

createApp(App).use(router).use(pinia).use(ElementPlus).mount('#app')
