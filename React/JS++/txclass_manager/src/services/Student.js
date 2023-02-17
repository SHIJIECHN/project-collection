import HTTP from "utils/http.js";
import { API } from "../config/config.js";

const STUDENT = API.STUDENT;

export default class StudentService extends HTTP {
  // 获取列表信息
  getStudentData() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: STUDENT.GET_STUDENT,
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