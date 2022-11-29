import HTTP from "utils/http.js";
import { API } from "../config/config.js";

export default class LoginService extends HTTP {
  // 登录
  loginAction(username) {
    return new Promise((resolve, reject) => {
      this.axiosPost({
        url: API.LOGIN_ACTION,
        data: username,
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

  loginCheck() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: API.LOGIN_CHECK,
        success(data) {
          resolve(data);
        },
        error(err) {
          alert('网络请求失败');
          window.location.reload();
        }
      })
    })
  }

  logoutAction() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: API.LOGOUT_ACTION,
        success(data) {
          resolve(data);
        },
        error(err) {
          alert('网络请求失败');
          window.location.reload();
        }
      })
    })
  }
}