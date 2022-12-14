import service from "@/http/request";
const url = {
  getTeamFileList: '/directory/teamFileList',
  createDirectory: '/directory/createDirectory',
  deleteDirectory: '/directory/deleteDirectory',
  renameDirectory: '/directory/rename',
  getTeamRecycleList: '/directory/getRecycleList',
  restoreDoc: '/directory/restoreDoc',
  finalDeleteDoc: '/directory/finalDeleteDoc',
};

export class Document {
  static async finalDeleteDoc(data) {
    return service(url.finalDeleteDoc, {
      method: "post",
      responseType: "json",
      data,
    });
  }

  static async restoreDoc(data) {
    return service(url.restoreDoc, {
      method: "post",
      responseType: "json",
      data,
    });
  }

  static async getTeamRecycleList(data) {
    return service(url.getTeamRecycleList, {
      method: "post",
      responseType: "json",
      data,
    });
  }

    static async renameDirectory(data) {
        return service(url.renameDirectory, {
          method: "post",
          responseType: "json",
          data,
        });
      }

    static async deleteDirectory(data) {
        return service(url.deleteDirectory, {
          method: "post",
          responseType: "json",
          data,
        });
      }

    static async createDirectory(data) {
        return service(url.createDirectory, {
          method: "post",
          responseType: "json",
          data,
        });
      }

    static async getTeamFileList(data) {
        return service(url.getTeamFileList, {
          method: "post",
          responseType: "json",
          data,
        });
      }
}