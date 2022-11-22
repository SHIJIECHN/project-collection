const ENV = require('./env_config.js')

module.exports = {
  MYSQL_CONF: {
    base: {
      host: 'localhost',
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    },
    conf: ['txclass', 'root', ENV.isPrd ? 'xxx' : ''] // 判断是不是正式环境，如果是则用xxx
  },
  REDIS_CONF: ['6379', '127.0.0.1'] // 端口 ip
}
