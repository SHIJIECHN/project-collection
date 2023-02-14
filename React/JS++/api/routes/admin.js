const router = require('koa-router')(),
  adminController = require('../controllors/Admin.js');

// 前缀
router.prefix('/admin');

router.get('/add_admin_account', adminController.addAdminAccount); // 添加admin账号
router.post('/login_action', adminController.loginAction); // 提交登录信息
router.get('/login_check', adminController.loginCheck); // 登录检查
router.get('/logout_action', adminController.logoutAction); // 退出登录

module.exports = router;