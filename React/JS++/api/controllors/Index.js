const { redisGet, redisSet } = require('../libs/redisClient.js');
const { returnInfo } = require('../libs/utils.js');
const { API } = require('../config/error_config.js');
const { getCourseData } = require('../services/Course.js');
const { getCourseFieldData } = require('../services/CourseTab.js');

class Index {
  async index(ctx, next) {
    const sess = ctx.session;

    if (!sess.uid) {
      sess.uid = 1;
      sess.usename = 'jsjiajia';
      sess.nickname = 'js++';
      sess.gender = 'male';
    }

    // redisSet('a', 1);
    // redisSet('json', { a: 1, b: 2 });

    // redisGet('json').then(res => {
    //   console.log(res);
    // })

    ctx.body = {
      session: sess
    }

    // await ctx.render('index');
  }
  async getCourseData(ctx, next) {
    const courseData = await getCourseData(),
      fieldData = await getCourseFieldData();

    ctx.body = courseData && fieldData
      ? returnInfo(API.RETURN_SUCCESS, {
        courseData,
        fieldData
      })
      : returnInfo(API.RETURN_FAILED)
  }
}

module.exports = new Index();