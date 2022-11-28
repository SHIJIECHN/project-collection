const router = require('koa-router')(),
  adminController = require('../controllors/Admin.js');

// 前缀
router.prefix('/admin');

router.get('/add_admin_account', adminController.addAdminAccount); // 添加admin账号
router.post('/login_action', adminController.loginAction); // 登录
router.get('/login_check', adminController.loginCheck)

module.exports = router;