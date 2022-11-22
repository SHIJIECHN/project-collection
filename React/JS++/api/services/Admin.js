const { adminInfo } = require('../config/config.js');
const AdminModel = require('../db/models/admin.js')

class AdminService {
  async addAdmin(adminInfo) {
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
}

module.exports = new AdminService();