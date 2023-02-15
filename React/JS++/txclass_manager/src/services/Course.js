import HTTP from "utils/http.js";
import { API } from "../config/config.js";

const COURSE = API.COURSE;

export default class CourseService extends HTTP {
  // 获取课程列表信息
  getCourseData() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: COURSE.GET_COURSE_DATA,
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

  // 修改课程列表分类
  changeCourseField(data) {
    return new Promise((resolve, reject) => {
      this.axiosPost({
        url: COURSE.CHANGE_COURSE_FIELD,
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