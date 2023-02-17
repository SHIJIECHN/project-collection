import HTTP from "utils/http.js";
import { API } from "../config/config.js";

const SLIDER = API.SLIDER;

export default class SliderService extends HTTP {
  // 获取课程列表信息
  getSliderData() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: SLIDER.GET_SLIDER_DATA,
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