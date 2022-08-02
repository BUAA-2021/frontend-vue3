import service from '@/http/request.js'

const url = {
    createTeam: '/team/create',
    getTeamInfo: '/team/teamInfo',
}

export class Team{
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