import service from "@/http/request";
const url = {
  test: "/api/pingpong/",
  login: "/user/login",
  register: "/user/register",
};

export class Account {
  static async Login(data) {
    return service(url.login, {
      method: "post",
      responseType: "json",
      data,
    });
  }

  static async Register(data) {
    return service(url.register, {
      method: "post",
      responseType: "json",
      data,
    });
  }
}
