import HTTP from "utils/http.js";
import { API } from "../config/config.js";

const COLLECTION = API.COLLECTION;

export default class CollectionService extends HTTP {
  // 课程上下架
  getCollectionData(data) {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: COLLECTION.GET_COLLECTION,
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