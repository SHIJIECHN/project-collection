const router = require('koa-router')(),
  indexController = require('../controllors/Index.js'),
  loginCheck = require('../middlewares/loginCheck.js');

router.get('/', indexController.index);
router.get('/get_courses', loginCheck, indexController.getCourseData); // 需要经过loginCheck中间件 获取课程管理列表
router.post('/change_course_field', loginCheck, indexController.changeCourseField); // 修改课程列表分类
// router.post('/change_course_status', loginCheck, indexController.changeCourseStatus); // 课程上下架

//----------------------------推荐课程-------------------------------------
router.get('/get_recom_courses', loginCheck, indexController.getRecomCourses); // 获取推荐课程管理列表
router.post('/change_status', loginCheck, indexController.changeDaTaStatus);

router.get('/get_sliders', loginCheck, indexController.getSliders); // 轮播图

//-------------------------------课程合集--------------------------------
router.get('/get_collections', loginCheck, indexController.getCollections); // 课程集合管理

router.get('/get_teachers', loginCheck, indexController.getTeachers); // 老师
router.post('/select_star_teacher', loginCheck, indexController.changeTeacherStar); // 明星老师

router.get('/get_students', loginCheck, indexController.getStudents)

module.exports = router;