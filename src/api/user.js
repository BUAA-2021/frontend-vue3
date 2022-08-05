import service from '@/http/request.js'

const url = {
    getUserList: '/user/list',
    getUserInfo: '/user/getUser',
    getDocList: '/user/getDocList',
    getUMLList: '/user/getUMLList',
    getProtoList: '/user/getProtoList',
    getSearchList: '/user/searchUserList',
}

export class User {
  static async getSearchList(data) {
    return service(url.getSearchList, {
      method: 'post',
      responseType: 'json',
      data
    })
  }

  static async getProtoList(data) {
    return service(url.getProtoList, {
      method: 'post',
      responseType: 'json',
      data
    })
  }

  static async getUMLList(data) {
    return service(url.getUMLList, {
      method: 'post',
      responseType: 'json',
      data
    })
  }

  static async getDocList(data) {
    return service(url.getDocList, {
      method: 'post',
      responseType: 'json',
      data
    })
}

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