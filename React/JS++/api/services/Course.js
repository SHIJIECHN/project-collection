const CourseModel = require('../db/models/course.js');

class CourseService {
  async addCourseData(data) {
    const cid = data.cid;

    const result = await CourseModel.findOne({
      where: { cid }
    })

    if (result) {
      return await CourseModel.update(data, {
        where: { cid }
      })
    } else {
      return await CourseModel.create(data);
    }
  }

  async getCourseData() {
    // 把数据取出来
    return await CourseModel.findAll({
      attributes: {
        exclude: ['posterUrl', 'description', 'createdAt', 'updatedAt']
      }
    })
  }

  // 修改课程管理分类
  async changeField(cid, field) {
    // 数据库更新
    const ret = await CourseModel.update({ field }, {
      where: { cid: cid }
    });

    return ret[0];
  }

  // 课程上下架
  async changeCourseStatus(id, status) {
    const ret = await CourseModel.update({ status }, {
      where: { cid: id }
    })

    return ret[0];
  }
}

module.exports = new CourseService();