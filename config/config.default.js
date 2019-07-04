'use strict';

module.exports = appInfo => {
  const config = {};

  /**
   * some description
   * @member Config#test
   * @property {String} key - some description
   */
  config.test = {
    key: appInfo.name + '_123456',
  };
  config.proxy = true;
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
    domainWhiteList: ['*'],
  };
  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  config.mongoose = {
    url: 'mongodb://47.95.226.238:27017/liyao',
    poolSize: 20,
    options: {
      auth: { authSource: 'liyao' },
      user: 'root',
      pass: 'rootliyao',
      useCreateIndex: true,
      useNewUrlParser: true,
    },
  };
  config.cluster = {
    listen: {
      port: 2332,
      hostname: '0.0.0.0',
    },
  };
  config.onerror = {
    all(err, ctx) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      ctx.set('Content-Type', 'application/json');
      // eslint-disable-next-line no-bitwise
      const ts = (0 | Date.now() / 1000).toString();
      err.stack = err.stack.replace(/[\r\n]/g, '');
      ctx.body = JSON.stringify({ code: err.status, msg: err.message, stack: err.stack, ts });
      ctx.status = 509;
    },
  };
  exports.jwt = {
    enable: false,
    secret: 'martinmadeliyao',
  };
  exports.logger = {
    outputJSON: true,
  };
  return config;
};
