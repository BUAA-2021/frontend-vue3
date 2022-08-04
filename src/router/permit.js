import { useStorage } from '@vueuse/core'
import router from './index'

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    console.log("TEST Token", token)
    if (token) {
        next()
    } else {
        if(to.path !== '/user/login'){
            ElMessage({
                type: 'warning',
                message: '请先进行登录'
            })
        }
        next({ name: 'login' })
    }
})