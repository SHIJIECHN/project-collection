const router = require('koa-router')(),
  adminController = require('../controllors/Admin.js');

// 前缀
router.prefix('/admin');

router.get('/add_admin_account', adminController.addAdminAccount);
router.post('/login_action', adminController.loginAction);

module.exports = router;