'use strict';
const path = require('path');
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
    domainWhiteList: [ '*' ],
  };
  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  config.mongoose = {
    url: 'mongodb://47.95.226.238:27017/test',
    poolSize: 20,
    options: {
      auth: { authSource: 'test' },
      user: 'test',
      pass: 'test',
      useCreateIndex: true,
      useNewUrlParser: true,
    },
  };
  // config.amqplib = {
  //   client: {
  //     // url: 'amqp://localhost',
  //     connectOptions: {
  //       protocol: 'amqp',
  //       hostname: 'localhost',
  //       port: 15672,
  //       username: 'guest',
  //       password: 'guest',
  //       locale: 'en_US',
  //       frameMax: 0,
  //       heartbeat: 0,
  //       vhost: '/',
  //     },
  //     // socketOptions: {
  //     //   cert: certificateAsBuffer, // client cert
  //     //   key: privateKeyAsBuffer, // client key
  //     //   passphrase: 'MySecretPassword', // passphrase for key
  //     //   ca: [caCertAsBuffer], // array of trusted CA certs
  //     // },
  //   },
  // };
  config.cluster = {
    listen: {
      port: 3333,
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
  // 静态文件夹，可以通过ip:port/public/实际路径名得到资源
  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'app/public'),
  };
  // 渲染模版，设置根路径
  config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
  };
  config.jwt = {
    secret: 'martinmadeliyao',
  };
  config.logger = {
    outputJSON: true,
  };
  return config;
};
