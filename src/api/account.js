import service from "@/http/request";
const url = {
  test: "/api/pingpong/",
  login: "/user/login",
  register: "/user/register",
  getUser: "/user/getUser",
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
}
