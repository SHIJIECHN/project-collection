const router = require('koa-router')(),
  adminController = require('../controllors/Admin.js');

// 前缀
router.prefix('/admin');

router.get('/create_admin', adminController.createAdmin);

module.exports = router;