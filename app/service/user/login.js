'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  async login(params) {
    const { ctx } = this;
    const phone = params.phone;
    const password = await this.md5cryp(params.password);
    const result = await ctx.model.User.findOne({ phone });

    if (result === null || password !== result.password) {
      ctx.throw(403, '用户名或密码错误');
    }
    const res = {
      _id: result._id,
      phone: result.phone,
      token: await this.createToken(phone),
    };
    return res;
  }
  // 通过传过来的数据创建一个token
  async createToken(_id) {
    const { ctx } = this;
    return ctx.app.jwt.sign({
      data: {
        _id,
      },
    }, ctx.app.config.jwt.secret);
  }

  // 对密码进行md5加密
  async md5cryp(content) {
    const crypto = require('crypto');
    const md5 = crypto.createHash('md5');
    md5.update(content);
    return md5.digest('hex');
  }
}

module.exports = LoginService;
