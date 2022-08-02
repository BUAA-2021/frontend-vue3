import service from "@/http/request";
const url = {
  test: "/api/pingpong/",
  login: "/user/login",
  register: "/user/register",
  getUser: "/user/getUser",
  editInfo: "/user/editInfo",
};

export class Account {
  static async login(data) {
    return service(url.login, {
      method: "post",
      responseType: "json",
      data,
    });
  }

  static async register(data) {
    return service(url.register, {
      method: "post",
      responseType: "json",
      data,
    });
  }

  static async getUser(data) {
    return service(url.getUser, {
      method: "post",
      responseType: "json",
      data,
    });
  }

  static async editInfo(data) {
    return service(url.editInfo, {
      method: "post",
      responseType: "json",
      data,
    });
  }
}
