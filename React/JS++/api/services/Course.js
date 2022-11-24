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
      // attributes: {
      //   exclude: ['posterUrl', 'description']
      // }
    })
  }
}

module.exports = new CourseService();