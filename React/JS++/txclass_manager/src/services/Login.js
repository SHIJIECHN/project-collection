import HTTP from "utils/http.js";
import { API } from "../config/config.js";

const LOGIN = API.LOGIN;

export default class LoginService extends HTTP {
  // 登录
  loginAction(username) {
    return new Promise((resolve, reject) => {
      this.axiosPost({
        url: LOGIN.LOGIN_ACTION,
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

  /** 登录验证 */
  loginCheck() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: LOGIN.LOGIN_CHECK,
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

  /** 退出登录 */
  logoutAction() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: LOGIN.LOGOUT_ACTION,
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