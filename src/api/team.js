import service from '@/http/request.js'

const url = {
    createTeam: '/team/create',
}

export class Team{
    static async createTeam(data) {
        return service(url.createTeam, {
          method: 'post',
          responseType: 'json',
          data
        })
    }
}