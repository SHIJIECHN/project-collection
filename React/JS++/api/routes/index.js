const router = require('koa-router')(),
  indexController = require('../controllors/Index.js'),
  loginCheck = require('../middlewares/loginCheck.js');

router.get('/', indexController.index);
router.get('/get_courses', loginCheck, indexController.getCourseData); // 需要经过loginCheck中间件 获取课程管理列表
router.post('/change_course_field', loginCheck, indexController.changeCourseField); // 修改课程列表分类

module.exports = router;