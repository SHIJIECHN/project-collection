const RecomCourseModel = require('../db/models/recomCourse.js');

class RecomCourseService {
  async addRecomCourse(data) {
    const cid = data.cid;

    const result = await RecomCourseModel.findOne({
      where: { cid }
    })

    if (result) {
      return await RecomCourseModel.update(data, {
        where: { cid }
      })
    } else {
      return await RecomCourseModel.create(data);
    }
  }

  // 获取推荐课程列表
  async getRecomCoursesData() {
    return await RecomCourseModel.findAll({
      attributes: {
        exclude: ['mainTitle', 'posterUrl', 'description', 'teacherImg']
      }
    })
  }

  // 课程上下架
  async changeRecomCourseStatus(id, status) {
    const ret = await RecomCourseModel.update({ status }, {
      where: { cid: id }
    });
    return ret[0];
  }
}

module.exports = new RecomCourseService();