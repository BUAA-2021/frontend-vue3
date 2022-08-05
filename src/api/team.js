import service from "@/http/request.js";

const url = {
  createTeam: "/team/create",
  getTeamInfo: "/team/teamInfo",
  addAdmin: "/team/addAdmin",
  deleteAdmin: "/team/deleteAdmin",
  addMember: "/team/addMember",
  deleteMember: "/team/deleteMember",
  getUserType: "/team/getUserType",
  deleteTeam: "/team/deleteTeam",
  getTeamList: "/team/getTeamList",
  renameTeam: "/team/teamRename",
  quitTeam: "/team/quitTeam",
};

export class Team {
  static async quitTeam(data) {
    return service(url.quitTeam, {
      method: "post",
      responseType: "json",
      data,
    });
  }

  static async getTeamList(data) {
    return service(url.getTeamList, {
      method: "post",
      responseType: "json",
      data,
    });
  }

  static async deleteTeam(data) {
    return service(url.deleteTeam, {
      method: "post",
      responseType: "json",
      data,
    });
  }

  static async deleteMember(data) {
    return service(url.deleteMember, {
      method: "post",
      responseType: "json",
      data,
    });
  }

  static async getUserType(data) {
    return service(url.getUserType, {
      method: "post",
      responseType: "json",
      data,
    });
  }

  static async addMember(data) {
    return service(url.addMember, {
      method: "post",
      responseType: "json",
      data,
    });
  }
  static async deleteAdmin(data) {
    return service(url.deleteAdmin, {
      method: "post",
      responseType: "json",
      data,
    });
  }

  static async addAdmin(data) {
    return service(url.addAdmin, {
      method: "post",
      responseType: "json",
      data,
    });
  }
  static async createTeam(data) {
    return service(url.createTeam, {
      method: "post",
      responseType: "json",
      data,
    });
  }
  static async getTeamInfo(data) {
    return service(url.getTeamInfo, {
      method: "post",
      responseType: "json",
      data,
    });
  }

  static async renameTeam(data) {
    return service(url.renameTeam, {
      method: "post",
      responseType: "json",
      data,
    });
  }
}
