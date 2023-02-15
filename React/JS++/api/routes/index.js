const router = require('koa-router')(),
  indexController = require('../controllors/Index.js'),
  loginCheck = require('../middlewares/loginCheck.js');

router.get('/', indexController.index);
router.get('/get_courses', loginCheck, indexController.getCourseData); // 需要经过loginCheck中间件 获取课程管理列表

module.exports = router;