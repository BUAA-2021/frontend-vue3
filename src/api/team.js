import service from '@/http/request.js'

const url = {
    createTeam: '/team/create',
    getTeamInfo: '/team/teamInfo',
    addAdmin: '/team/addAdmin',
    deleteAdmin: '/team/deleteAdmin',
    addMember: '/team/addMember',
}

export class Team{
  static async addMember(data) {
    return service(url.addMember, {
      method: 'post',
      responseType: 'json',
      data
    })
}
static async deleteAdmin(data) {
  return service(url.deleteAdmin, {
    method: 'post',
    responseType: 'json',
    data
  })
}

  static async addAdmin(data) {
    return service(url.addAdmin, {
      method: 'post',
      responseType: 'json',
      data
    })
}
    static async createTeam(data) {
        return service(url.createTeam, {
          method: 'post',
          responseType: 'json',
          data
        })
    }
    static async getTeamInfo(data) {
        return service(url.getTeamInfo, {
          method: 'post',
          responseType: 'json',
          data
        })
    }
}