import service from '@/http/request.js'

const url = {
    getUserList: '/user/list',
}

export class User {
    static async getUserList(data) {
        return service(url.getUserList, {
          method: 'get',
          responseType: 'json',
          data
        })
    }
}