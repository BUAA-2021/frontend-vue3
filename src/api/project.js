import service from '@/http/request.js'

const url = {
    getProjectList: '/project/list',
}

export class Project{
    static async getProjectList(data) {
        return service(url.getProjectList, {
            method: 'post',
            responseType: 'json',
            data
        })
    }
}