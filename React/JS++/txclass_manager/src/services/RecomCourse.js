import HTTP from "utils/http.js";
import { API } from "../config/config.js";

const RECOM_COURSE = API.RECOM_COURSE,
  COMMON = API.COMMON;

export default class RecomCourseService extends HTTP {
  // 获取课程列表信息
  getRecomCourseData() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: RECOM_COURSE.GET_RECOM_COURSE_DATA,
        success(data) {
          resolve(data);
        },
        error(err) {
          alert('网络请求失败');
          // window.location.reload();
        }
      })
    })
  }
}