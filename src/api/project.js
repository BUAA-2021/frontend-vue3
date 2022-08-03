import service from '@/http/request.js'

const url = {
    getProjectList: '/project/list',
    deleteProject: '/project/delete',
    reNameProject: '/project/rename',
    getRecycleList: '/project/deletedList',
    finalDeleted: '/project/finalDeleted',
    recoverProject: '/project/recover',
}

export class Project{
    static async finalDeleted(data) {
        return service(url.finalDeleted, {
            method: 'post',
            responseType: 'json',
            data
        })
    }

    static async recoverProject(data) {
        return service(url.recoverProject, {
            method: 'post',
            responseType: 'json',
            data
        })
    }

    static async getRecycleList(data) {
        return service(url.getRecycleList, {
            method: 'post',
            responseType: 'json',
            data
        })
    }

    static async deleteProject(data) {
        return service(url.deleteProject, {
            method: 'post',
            responseType: 'json',
            data
        })
    }

    static async renameProject(data) {
        return service(url.reNameProject, {
            method: 'post',
            responseType: 'json',
            data
        })
    }

    static async getProjectList(data) {
        return service(url.getProjectList, {
            method: 'post',
            responseType: 'json',
            data
        })
    }
}