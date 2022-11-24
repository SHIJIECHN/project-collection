const router = require('koa-router')(),
  indexController = require('../controllors/Index.js');

router.get('/', indexController.index);
router.get('/get_courses', indexController.getCourseData);

module.exports = router;