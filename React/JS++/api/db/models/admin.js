const seq = require('../connection/mysql_connect.js');
const { STRING, TEXT, INT } = require('../../config/db_type_config.js');

const Admin = seq.define('admin', {
  username: {
    comment: 'admin user name',
    type: STRING,
    allowNul: false
  },
  password: {
    comment: 'crypto user password',
    type: STRING,
    allowNul: false
  }
})

module.exports = Admin;