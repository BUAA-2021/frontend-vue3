import service from '@/http/request.js'

const url = {
    getProjectList: '/project/list',
    deleteProject: '/project/delete',
    reNameProject: '/project/rename',
    getRecycleList: '/project/deletedList',
    finalDeleted: '/project/finalDeleted',
    recoverProject: '/project/recover',
    getUserProjectList: '/project/userList',
    getProjectInfo: '/project/detail',
    deleteResource: '/project/deleteResource',
    addDoc: '/project/addDoc',
    addUML: '/project/addUML',
    addProto: '/project/addProto',
    createProject: '/project/create',
    deleteDoc: '/project/deleteDoc',
}

export class Project{
    static async deleteDoc(data) {
        return service(url.deleteDoc, {
          method: 'post',
          responseType: 'json',
          data
        })
      }

    static async createProject(data) {
        return service(url.createProject, {
          method: 'post',
          responseType: 'json',
          data
        })
      }

    static async addProto(data) {
        return service(url.addProto, {
          method: 'post',
          responseType: 'json',
          data
        })
      }

    static async addUML(data) {
        return service(url.addUML, {
          method: 'post',
          responseType: 'json',
          data
        })
      }

    static async addDoc(data) {
        return service(url.addDoc, {
          method: 'post',
          responseType: 'json',
          data
        })
      }


    static async getProjectInfo(data) {
        return service(url.getProjectInfo, {
          method: 'post',
          responseType: 'json',
          data
        })
      }
    static async getUserProjectList(data) {
        return service(url.getUserProjectList, {
          method: 'post',
          responseType: 'json',
          data
        })
      }

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