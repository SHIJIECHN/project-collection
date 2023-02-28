const { createProxyMiddleware } = require('http-proxy-middleware');

modle.exports = function (app) {
  app.use(
    createProxyMiddleware("/jian", {
      target: 'https://www.jianshu/asimov',
      changeOrigin: true,
      ws: true,
      pathRewrite: { "/jian": '' }
    })
  ),
    app.use(
      createProxyMiddleware("/zhi", {
        target: 'https://news-at.zhihu.com/api/4',
        changeOrigin: true,
        ws: true,
        pathRewrite: { "/zhi": '' }
      })
    )
}