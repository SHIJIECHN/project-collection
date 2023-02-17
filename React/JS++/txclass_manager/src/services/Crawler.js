import HTTP from "utils/http.js";
import { API } from "../config/config.js";

const CRAWLER = API.CRALWER

export default class Crawler extends HTTP {
  crawlAction(apiName) {
    return new Promise((resolve, reject) => {
      this.axiosPost({
        url: CRAWLER.CRAWLER_ACTION,
        data: { apiName },
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