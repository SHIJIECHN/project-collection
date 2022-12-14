// 关于我们
const Crawler = require('../libs/crawler.js'),
  { crawler } = require('../config/config.js');

Crawler({
  url: crawler.url.aboutus,
  callback() {
    const $ = window.$,
      $wrapper = $('.agency-about');

    const data = {
      aid: 1,
      posterUrl: $wrapper.find('.about-banner-pic0').css('background-image').match(/\"(.+?)\"/)[1],
      title: $wrapper.find('.about-agency-propagate').text(),
      name: $wrapper.find('.about-agency-name').text(),
      intro: $wrapper.find('.about-agency-intr').text(),
      posterKey: ''
    }

    return data;
  }
})