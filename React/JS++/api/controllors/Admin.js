const { adminAccount } = require('../config/config.js'),
  { createAdminAccount, login } = require('../services/Admin.js'),
  { makeCrypto, returnInfo, trimSpace } = require('../libs/utils.js'),
  { LOGIN } = require('../config/error_config.js');

class Admin {
  // 创建管理员账号
  async addAdminAccount() {
    adminAccount.password = makeCrypto(adminAccount.password);

    const result = await createAdminAccount(adminAccount);

    if (result) {
      console.log(0)
    } else {
      console.log(1)
    }
  }

  // 验证是否已经登录中间件
  async loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
      // 登录状态
      ctx.body = returnInfo(LOGIN.LOGIN_STATUS);
      return;
    }
    // 非登录状态
    ctx.body = returnInfo(LOGIN.NOT_LOGIN_STATUS);
  }

  // 登录
  async loginAction(ctx, next) {
    // 解构传过来的数据
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      ctx.body = returnInfo(LOGIN.INVALID_OPERATION);
      return;
    }
    // 判断用户名是否正确
    if (trimSpace(username).length < 0) {
      ctx.body = returnInfo(LOGIN.INVALID_USERNAME_LENGTH);
      return;
    }

    // 判断密码长度是否正确
    if (trimSpace(password).length < 0) {
      ctx.body = returnInfo(LOGIN.INVALID_PASSWORD_LENGTH);
      return;
    }

    // 组装用户信息
    const userInfo = {
      username: trimSpace(username),
      password: makeCrypto(trimSpace(password)) // 密码需要加密再传
    }

    // 查询数据库，并比对数据。接收返回状态码。
    const result = await login(userInfo);

    if (result === 10003) {
      ctx.body = returnInfo(LOGIN.USERNAME_NOT_EXIST);
      return;
    }

    if (result === 10004) {
      ctx.body = returnInfo(LOGIN.PASSWORD_ERROR);
      return;
    }
    // 将登录信息存入session中
    if (!ctx.session.userInfo) {
      ctx.session.userInfo = result
    }

    // 登录成功
    return ctx.body = returnInfo(LOGIN.SUCCESS, ctx.session.userInfo);
  }
}

module.exports = new Admin();