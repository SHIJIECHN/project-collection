const cp = require('child_process'),
  nanoId = require('nanoid'),
  Qiniu = require('qiniu'),
  crypto = require('crypto'),
  { resolve } = require('path'),
  { qiniu, cryptoSecret } = require('../config/config.js')

// 启动进程
function startProcess(options) {
  // 拼接路径，导入爬虫脚本：crawlers/silder.js
  const script = resolve(__dirname, '../crawlers/' + options.file),
    // 开启子进程执行script
    child = cp.fork(script, []);

  let invoked = false;

  child.on('message', (data) => {
    options.message(data);
  })

  child.on('exit', (code) => {
    if (invoked) return;

    invoked = true;
    options.exit(code);
  })

  child.on('error', (err) => {
    if (invoked) return;

    invoked = true;
    options.error(err);
  })
}

// 上传图片到七牛云图床
function qiniuUpload(options) {
  // 七牛上传配置
  const mac = new Qiniu.auth.digest.Mac(qiniu.keys.ak, qiniu.keys.sk),
    conf = new Qiniu.conf.Config(),
    client = new Qiniu.rs.BucketManager(mac, conf),
    key = nanoId() + options.ext;

  return new Promise((resolve, reject) => {
    client.fetch(options.url, options.bucket, key, (error, res, info) => {
      if (error) {
        reject(error)
      } else {
        if (info.statusCode === 200) {
          resolve({ key })
        } else {
          reject(info)
        }
      }
    })
  })
}

// 加密
function makeCrypto(str) {
  const _md5 = crypto.createHash('md5'),
    content = `str=${str}&secret=${cryptoSecret}`;

  return _md5.update(content).digest('hex');
}

// 去掉空格
function trimSpace(str) {
  return str.replace(/\s+/g, '');
}

// 请求返回的数据格式
function returnInfo(errorInfo, data) {
  if (data) {
    errorInfo.data = data;
  }

  return errorInfo;
}

module.exports = {
  startProcess,
  qiniuUpload,
  makeCrypto,
  trimSpace,
  returnInfo
}

