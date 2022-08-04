import router from './index'

router.beforeEach(async (to, from,next) => {
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
    else if(token!=null
        && (to.name==='login'||to.name=='register')){
            next('/team/create');
            ElMessage({
                type: 'warning',
                message: '您已经登录'
            })
            return false;
        }
    
})