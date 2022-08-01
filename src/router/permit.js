import { useStorage } from '@vueuse/core'
import router from './index'

router.beforeEach((to, from, next) => {
    const token = useStorage('token')
    if (token.value) {
        next()
    } else {
        ElMessage({
            type: 'warning',
            message: '请先进行登录'
        })
        next({ name: 'login' })
    }
})