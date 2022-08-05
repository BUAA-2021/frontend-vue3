import service from '@/http/request.js'

const url = {
    getMessageList: '/message/list',
}

export class File {
    static async getMessageList(data) {
        return service(url.getMessageList, {
          method: 'post',
          responseType: 'json',
          data
        })
    }
}