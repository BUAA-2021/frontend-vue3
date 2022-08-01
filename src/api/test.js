import service from '@/http/request'
const url={
    test:'/api/pingpong/',
}
export class Test {
    static async test(){
        return service(url.test,{
            method:'get',
            responseType:'json',
        })
    }
}