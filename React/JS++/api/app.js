const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session');
const koaRedis = require('koa-redis');
const cors = require('koa2-cors');

const { sessionInfo, cookieInfo, redisInfo, corsOrigin } = require('./config/config.js')

const crawlerRouter = require('./routes/crawler');
const indexRouter = require('./routes/index.js');
const adminRouter = require('./routes/admin.js')


// error handler
onerror(app);

// 跨域设置
app.use(cors({
  origin: function (ctx) {
    return corsOrigin; // 环境判断
  },
  // 配置浏览器在不同源的情况下，允许设置Cookie
  credentials: true
}))

// global middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// 加密cookie的key
app.keys = sessionInfo.keys;
// 中间件
app.use(session({
  key: sessionInfo.name, // cookie name
  prefix: sessionInfo.prefix,  // redis key前缀
  cookie: cookieInfo,
  // Redis
  store: koaRedis(redisInfo)
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
app.use(crawlerRouter.routes(), crawlerRouter.allowedMethods());
app.use(indexRouter.routes(), indexRouter.allowedMethods());
app.use(adminRouter.routes(), adminRouter.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
