const { adminInfo } = require('../config/config.js');
const AdminModel = require('../db/models/admin.js')

class AdminService {
  async createAdminAccount(adminInfo) {
    const { username } = adminInfo;

    const result = await AdminModel.findOne({
      where: { username }
    });

    if (result) {
      return await AdminModel.update(adminInfo, {
        where: { username }
      })
    } else {
      return await AdminModel.create(adminInfo);
    }
  }

  async login(userInfo) {
    const { username, password } = userInfo;

    // 获取数据库中的数据, 是一个集合
    const usernameExist = await AdminModel.findOne({
      where: { username }
    })
    // username 数据不存在
    if (!usernameExist) {
      return 10003;
    }

    // 数据库中的密码
    const dbPassword = usernameExist.get('password');
    // 密码不相等
    if (password !== dbPassword) {
      return 10004;
    }

    const uid = usernameExist.get('id');
    // 成功
    return {
      uid,
      username
    };
  }
}

module.exports = new AdminService();