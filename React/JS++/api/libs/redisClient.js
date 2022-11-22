const red = require('../db/connection/redis_connect.js');

/**
 * 设置redis值
 * @param {*} key 设置的key
 * @param {*} value 相应的value
 * @param {*} timeout 过期时间 默认1小时
 */
function redisSet(key, value, timeout = 60 * 60) {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }

  red.set(key, value);
  red.expire(key, timeout)
}

/**
 * 获取redis值
 * @param {*} key 
 * @returns Promise
 */
function redisGet(key) {
  return new Promise((resolve, reject) => {
    red.get(key, (error, value) => {
      if (error) {
        reject(error);
        return;
      }

      if (value == null) {
        resolve(null);
        return;
      }

      try {
        // 如果是JSON字符串
        resolve(JSON.parse(value));
      } catch (e) {
        // 不是JSON字符串
        resolve(value);
      }
    })
  })
}

module.exports = {
  redisSet,
  redisGet,
}