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
  async create(phone, password) {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({ phone }, { _id: 1 });
    if (user) {
      return this.ctx.throw(403, '手机号码重复');
    }
    password = await this.md5cryp(password);
    const res = await ctx.model.User.create({ phone, password });
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
   * @param {String} password 密码
   * @returns res
   * @memberof UserService
   */
  async update(_id, phone, password) {
    const { ctx } = this;
    const res = await ctx.model.User.updateOne({ _id }, { phone, password });
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
}
module.exports = UserService;
