import service from '@/http/request.js'

const url = {
    getMessageList: '/message/list',
    sendMessage: '/message/send',
}

export class Message {
    static async sendMessage(data) {
        return service(url.sendMessage, {
          method: 'post',
          responseType: 'json',
          data
        })
    }

    static async getMessageList(data) {
        return service(url.getMessageList, {
          method: 'post',
          responseType: 'json',
          data
        })
    }
}