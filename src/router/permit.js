import router from './index'

router.beforeEach(async (to, from) => {
    const token = localStorage.getItem('token')
    console.log("TOKEN:", token)
    if(token==null
        && to.name!=='login'
        && to.name!=='register'
        && to.name!=='home'
        ){
        ElMessage({
            type: 'warning',
            message: '请先进行登录'
        })
        return ({name:'login'})
    }
})