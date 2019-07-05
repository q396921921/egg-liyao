'use strict';
const { Controller } = require('egg');

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  // post创建一个人员
  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body;
    const res = await service.user.user.create(payload);
    ctx.helper.success(ctx, res);
  }
  // delete删除指定人员
  async destroy() {
    const { ctx, service } = this;
    const _id = ctx.params.id;
    const res = await service.user.user.destroy(_id);
    ctx.helper.success(ctx, res);
  }
  // put修改人员信息
  async update() {
    const { ctx, service } = this;
    const _id = ctx.params.id;
    const payload = ctx.request.body;
    const res = await service.user.user.update(_id, payload);
    ctx.helper.success(ctx, res);
  }
  // get传递电话，查询对应人的详细信息
  async show() {
    const { ctx, service } = this;
    const phone = ctx.params.id;
    const res = await service.user.user.show(phone);
    ctx.helper.success(ctx, res);
  }
  async text() {
    const { ctx } = this;
    ctx.helper.success(ctx, { a: 123 });
  }
}
module.exports = UserController;
