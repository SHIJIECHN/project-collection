const pt = require('puppeteer');

/**
 * 开始爬虫配置，包括爬取的网页url、分析页面回调、发送数据结果
 * @param {*} options 
 */
module.exports = async function (options) {
  const bs = await pt.launch(),
    pg = await bs.newPage(),
    url = options.url;

  await pg.goto(url, {
    waitUtil: 'networkidle2'
  })

  const result = await pg.evaluate(options.callback);

  if (result && options.field === 'course') {
    await pg.waitForSelector('.page-btn.page-last'); // 等待出现再页面
    await pg.click('.page-btn.page-last');
    await pg.waitFor(2000);
    const res = await pg.evaluate(options.callback);
    await pg.waitFor(2000);
    for (var i = 0; i < res.length; i++) {
      await result.push(res[i]);
    }
  }

  await bs.close();

  process.send(result);

  setTimeout(() => {
    process.exit(0);
  }, 1000)
}