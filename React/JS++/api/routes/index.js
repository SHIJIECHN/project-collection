const router = require('koa-router')(),
  indexController = require('../controllors/Index.js');

router.get('/', indexController.index);

module.exports = router;