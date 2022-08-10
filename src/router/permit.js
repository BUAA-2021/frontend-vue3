import router from './index'

router.beforeEach(async (to, from,next) => {
    const token = localStorage.getItem('token')
    if(token==null
        && to.name!=='login'
        && to.name!=='register'
        && to.name!=='home'
        && to.name!=='overview'
        ){
        ElMessage({
            type: 'warning',
            message: '请先进行登录'
        })
        next({ name:'login' })
    }
    else if(token!=null
        && (from.name!='overview'&&(to.name==='login'||to.name=='register'))){
            if(from.path!='/'){
                ElMessage({
                    type: 'warning',
                    message: '您已经登录'
                })
            }
            next({path:'/team/create'})
        }
    else next();
})