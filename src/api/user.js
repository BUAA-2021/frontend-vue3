import service from '@/http/request.js'

const url = {
    getUserList: '/user/list',
    getUserInfo: '/user/getUser',
}

export class User {
    static async getUserInfo(data) {
        return service(url.getUserInfo, {
          method: 'post',
          responseType: 'json',
          data
        })
    }

    static async getUserList(data) {
        return service(url.getUserList, {
          method: 'get',
          responseType: 'json',
          data
        })
    }
}