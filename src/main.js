import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import store from './store'
import './router/permit'
// 引入element并做本地配置
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
// icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import {componentInit} from '@/custom-component' // 注册自定义组件
// 原型设计静态资源
import '@/styles/reset.css'
import '@/styles/global.scss'
import '@/assets/iconfont/iconfont.css'
import '@/styles/animate.scss'
const app = createApp(App)
window.$vueApp = app

// icon图标全局组件注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(createPinia())
app.use(router)
app.use(store)
app.use(ElementPlus, {locale})

componentInit();
app.mount('#app')
