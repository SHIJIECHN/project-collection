const { redisGet, redisSet } = require('../libs/redisClient.js');
const { returnInfo } = require('../libs/utils.js');
const { API } = require('../config/error_config.js');
const { getCourseData, changeField, changeCourseStatus } = require('../services/Course.js');
const { getRecomCoursesData, changeRecomCourseStatus } = require('../services/RecomCourse.js')
const { getCourseFieldData } = require('../services/CourseTab.js');
const { getSliderData, changeSliderStatus } = require('../services/Slider.js')
const { getCollectionsData, changeCollectionsStatus } = require('../services/Collection.js')
const { getTeacherData, changeTeacherStatus, selectStarTeacher } = require('../services/Teacher.js')
const { getStudentData, changeStudentStatus } = require('../services/Student.js')

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

  async changeCourseField(ctx, next) {
    const { cid, field } = ctx.request.body; // 获取传过来的数据
    const result = await changeField(cid, field);
    if (!result) {
      ctx.body = returnInfo(API.CHANGE_COURSE_FIELD_FAILED);
      return;
    }
    ctx.body = returnInfo(API.CHANGE_COURSE_FIELD_SUCCESS);
  }

  //---------------------------------------推荐课程---------------------------------------
  // 推荐课程管理列表
  async getRecomCourses(ctx, next) {
    const data = await getRecomCoursesData();
    ctx.body = data ? returnInfo(API.RETURN_SUCCESS, data) : returnInfo(API.RETURN_FAILED)
  }

  // 上下架统一接口管理
  async changeDaTaStatus(ctx, next) {
    const { id, status, field } = ctx.request.body;
    let result = null;

    switch (field) {
      case 'COURSE': // 课程管理
        result = await changeCourseStatus(id, status);
        break;
      case 'RECOM_COURSE': // 推荐课程
        result = await changeRecomCourseStatus(id, status);
        break;
      case 'SLIDER': // 轮播图
        result = await changeSliderStatus(id, status);
        break;
      case 'COLLECTION':
        result = await changeCollectionsStatus(id, status);
        break;
      case 'TEACHER':
        result = await changeTeacherStatus(id, status);
        break;
      case 'STUDENT':
        result = await changeStudentStatus(id, status);
        break;
      default:
        ctx.body = returnInfo(API.FIELD_ERROR);
        return;
    }

    // result错误返回0，正确返回1
    if (!result) {
      ctx.body = returnInfo(API.CHANGE_STATUS_FAILED);
      return;
    }
    ctx.body = returnInfo(API.CHANGE_STATUS_SUCCESS);
  }

  // ------------------------------------轮播图----------------------------------
  async getSliders(ctx, next) {
    const data = await getSliderData();

    ctx.body = data
      ? returnInfo(API.RETURN_SUCCESS, data)
      : returnInfo(API.RETURN_FAILED)
  }

  // ----------------------------------课程集合管理--------------------------------
  async getCollections(ctx, next) {
    const data = await getCollectionsData();

    ctx.body = data
      ? returnInfo(API.RETURN_SUCCESS, data)
      : returnInfo(API.RETURN_FAILED)
  }

  // ---------------------老师管理-------------------
  async getTeachers(ctx, next) {
    const data = await getTeacherData();

    ctx.body = data
      ? returnInfo(API.RETURN_SUCCESS, data)
      : returnInfo(API.RETURN_FAILED)
  }

  async changeTeacherStar(ctx, next) {
    const { id, isStar } = ctx.request.body;

    const result = await selectStarTeacher(id, isStar);
    if (!result) {
      ctx.body = returnInfo(API.SELECT_STAR_TEACHER_FAILED);
      return;
    }
    ctx.body = returnInfo(API.SELECT_STAR_TEACHER_SUCCESS);
  }

  async getStudents(ctx, next) {
    const data = await getStudentData();

    ctx.body = data
      ? returnInfo(API.RETURN_SUCCESS, data)
      : returnInfo(API.RETURN_FAILED)
  }
}

module.exports = new Index();