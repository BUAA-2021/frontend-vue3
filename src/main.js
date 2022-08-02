import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './router/permit'
// 引入element并做本地配置
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
// icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 暗黑模式css
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
// axios注入
import Axios from "axios"
app.config.globalProperties.$axios = Axios
// icon图标全局组件注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(createPinia())
app.use(router)
app.use(ElementPlus, {locale})

app.mount('#app')
