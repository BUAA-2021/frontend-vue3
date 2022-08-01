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
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "json",
      data: data,
    });
  }

  static async Register(data) {
    return service(url.register, {
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "json",
      data: data,
    });
  }
}
