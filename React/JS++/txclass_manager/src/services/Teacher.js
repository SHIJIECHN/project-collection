import HTTP from "utils/http.js";
import { API } from "../config/config.js";

const TEACHER = API.TEACHER;

export default class TeacherService extends HTTP {
  // 获取列表信息
  getTeacherData() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: TEACHER.GET_TEACHER,
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

  // 明星老师
  selectStarTeacher(data) {
    return new Promise((resolve, reject) => {
      this.axiosPost({
        url: TEACHER.SELECT_STAR_TEACHER,
        data,
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