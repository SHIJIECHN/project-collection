import HTTP from "utils/http.js";
import { API } from "../config/config.js";

const COMMON = API.COMMON;

export default class CommonService extends HTTP {
  // 课程上下架
  changeStatus(data) {
    return new Promise((resolve, reject) => {
      this.axiosPost({
        url: COMMON.CHANGE_STATUS,
        data,
        success(data) {
          resolve(data);
        },
        error(err) {
          alert('网络请求失败');
        }
      })
    })
  }
}