// Tab
const Crawler = require('../libs/crawler.js'),
  { crawler } = require('../config/config.js');

Crawler({
  url: crawler.url.course,
  callback() {
    const $ = window.$,
      $item = $('.course-tab-filter li');

    const data = [];

    $item.each((index, item) => {
      const $el = $(item),
        $itemLink = $el.find('.course-tab-filter-item'),
        title = $itemLink.text().replace('促', '');

      if (title !== '全部') {
        const dataItem = {
          cid: index + 1,
          title: $itemLink.text().replace('促', '')
        }

        data.push(dataItem)
      }
    })
    return data;
  }

})