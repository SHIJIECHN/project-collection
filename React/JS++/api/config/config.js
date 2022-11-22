const { REDIS_CONF } = require('./db_config.js')

module.exports = {
  qiniu: {
    keys: {
      ak: 'INZdqGOz-wkhCkyCYT4ItH3hodUg2_IVVtQxOWud',
      sk: '54fjgxSI3-4OiKquJbrsmGe81aXcvApMGt1LYgph',
    },
    bucket: {
      tximg: {
        bucket_name: 'source-image',
        domain: 'http://rl63od9kl.hd-bkt.clouddn.com/'
      }
    }
  },
  crawler: {
    url: {
      main: 'https://ke.qq.com/cgi-bin/agency?aid=64228#category=-1&tab=0',
      course: 'https://ke.qq.com/cgi-bin/agency?aid=64228#tab=1&category=-1',
      teacher: 'https://ke.qq.com/cgi-bin/agency?aid=64228#tab=2&category=-1',
      aboutus: 'https://ke.qq.com/cgi-bin/agency?aid=64228#category=14687&tab=3'
    }
  },
  sessionInfo: {
    keys: ['a1s2@d3#f4$_+g5%6^'], // 加密cookie
    name: 'txclass.sid', // 一般就是 项目.sid
    prefix: 'txclass.sess', // 项目.sess
  },
  cookieInfo: {
    path: '/', // 作用的范围，一般作用在全局根目录
    HTTPOnly: true, // 不允许修改
    maxAge: 24 * 60 * 60 * 100, // 过期时间 1天
  },
  redisInfo: {
    all: `${REDIS_CONF[1]}:${REDIS_CONF[0]}`, // 所有的redis都使用一个连接 127.0.0.1:6379
  },
  adminInfo: {
    username: 'admin',
    password: 'admin'
  },
  cryptoSecret: 'sSDKFJsinhfj%^^&&S^S&S&*(*SD*SDUJFJJD(SIKSOOS)dsss^*^',
}