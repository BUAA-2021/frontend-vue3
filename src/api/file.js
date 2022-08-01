import service from '@/http/request.js'

const url = {
    uploadFile: '/file/upload',
}

export class File {
    static async uploadFile(data) {
        return service(url.uploadFile, {
          method: 'post',
          responseType: 'json',
          data
        })
    }
}