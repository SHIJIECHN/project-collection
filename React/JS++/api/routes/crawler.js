const router = require('koa-router')(),
  crawlerController = require('../controllors/Crawler.js')
// child_process 启动一个子进程
cp = require('child_process'),
  { resolve } = require('path'),
  loginCheck = require('../middlewares/loginCheck.js');

// 前缀
router.prefix('/crawler');

router.get('/crawl_slider_data', loginCheck, crawlerController.crawlSiderData);
router.get('/crawl_agency_info', loginCheck, crawlerController.crawlAgencyInfo);
router.get('/crawl_recom_course', loginCheck, crawlerController.crawlRecomCourse);
router.get('/crawl_collection', loginCheck, crawlerController.crawlCollection);
router.get('/crawl_teacher', loginCheck, crawlerController.crawlTeacher);
router.get('/crawl_student', loginCheck, crawlerController.crawlStudent);
router.get('/crawl_course_tab', loginCheck, crawlerController.crawlCourseTab);
router.get('/crawl_course_data', loginCheck, crawlerController.crawlCourseData);
router.get('/crawl_aboutus', loginCheck, crawlerController.crawlAboutus);

router.post('/crawler_action', loginCheck, crawlerController.crawlerAction);

module.exports = router;
