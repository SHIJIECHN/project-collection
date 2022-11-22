const { adminInfo } = require('../config/config.js'),
  { addAdmin } = require('../services/Admin.js'),
  { makeCrypto } = require('../libs/utils.js');

class Admin {
  async createAdmin() {
    adminInfo.password = makeCrypto(adminInfo.password);

    const result = await addAdmin(adminInfo);

    if (result) {
      console.log(0)
    } else {
      console.log(1)
    }
  }
}

module.exports = new Admin();