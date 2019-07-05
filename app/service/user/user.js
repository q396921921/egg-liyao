'use strict';

const { Service } = require('egg');


class UserService extends Service {
  /**
   * 创建一个人员
   *
   * @param {String} phone 手机号
   * @param {String} password 密码
   * @returns res
   * @memberof UserService
   */
  async create(payload) {
    const { ctx } = this;
    const obj = ctx.helper.for({}, payload);
    const user = await ctx.model.User.findOne({ phone: payload.phone }, { _id: 1 });
    if (user) {
      return ctx.throw(403, '手机号码重复');
    }
    obj.password = await this.md5cryp(obj.password);
    const res = await ctx.model.User.create(obj);
    return res;
  }
  /**
   * 传入主键Id，删除该人员
   *
   * @param {String} _id 主键Id
   * @memberof UserService
   */
  async destroy(_id) {
    const { ctx } = this;
    const res = await ctx.model.User.remove({ _id });
    return res;
  }
  /**
   * 传入参数修改人员信息
   *
   * @param {String} _id 主键Id
   * @param {String} phone 手机号
   * @returns res
   * @memberof UserService
   */
  async update(_id, payload) {
    const { ctx } = this;
    const user1 = await ctx.model.User.findOne({ _id }); // 当前用户对应的人员
    const user2 = await ctx.model.User.findOne({ phone: payload.phone }); // 新手机号对应的人员
    if (user2 && user1._id.toString() !== user2._id.toString()) {
      return ctx.throw(403, '手机号码已存在');
    }
    const obj = ctx.helper.for({}, payload);
    if (obj.hasOwnProperty('password')) {
      obj.password = await this.md5cryp(obj.password);
    }
    const res = await ctx.model.User.updateOne({ _id }, obj);
    return res;
  }
  /**
   * 传入手机号，获得该人员信息
   *
   * @param {String} phone 手机号
   * @returns {Object} res
   * @memberof UserService
   */
  async show(phone) {
    const { ctx } = this;
    const res = await ctx.model.User.findOne({ phone });
    return res;
  }
  // 对密码进行加密
  async md5cryp(content) {
    const crypto = require('crypto');
    const md5 = crypto.createHash('md5');
    md5.update(content);
    return md5.digest('hex');
  }
}
module.exports = UserService;
