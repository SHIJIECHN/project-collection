// 配置连接Redis
const redis = require('redis'),
  { REDIS_CONF } = require('../../config/db_config.js');

const red = redis.createClient(REDIS_CONF) // 创建客户端 redis-cli.exe

// 监听错误
red.on('error', (error) => {
  console.error('Redis error: ' + error);
})

module.exports = red;