import axios from 'axios';
import qs from 'qs';

export default class HTTP {
  axiosPost(options) {
    axios({
      url: options.url,
      method: 'post',
      withCredentials: true, // 配置请求头携带Cookie
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify(options.data), // {username:xxx,password:xxx} -> username=xxx&password=xxx
    }).then((res) => {
      options.success(res.data);
    }).catch(err => {
      options.error(err)
    })
  }
  axiosGet(options) {
    axios({
      url: options.url,
      method: 'get',
      withCredentials: true
    }).then((res) => {
      options.success(res.data);
    }).catch(err => {
      options.error(err);
    })
  }
}