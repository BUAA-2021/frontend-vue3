import service from '@/http/request.js'

const url = {
    uploadFile: '/file/upload',
    export:'/file/export',
    generatePreview: '/file/generatePreview',
}

export class File {

    static async generatePreview(data) {
        return service(url.generatePreview, {
          method: 'post',
          responseType: 'json',
          data
        })
    }

    static async uploadFile(data) {
        return service(url.uploadFile, {
          method: 'post',
          responseType: 'json',
          data
        })
    }
    static async exportFile(data) {
        return service(url.export, {
            method: 'post',
            responseType: 'blob',
            data
          })
      }
}