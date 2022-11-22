const ENV = process.env.NODE_ENV;

module.exports = {
  // 用于对数据库的连接使用什么密码
  isDev: ENV === 'dev', // true 是开发环境
  isPrd: ENV === 'production', // true 是正式环境
}