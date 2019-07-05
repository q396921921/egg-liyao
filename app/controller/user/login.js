'use strict';
const { Controller } = require('egg');
const rule = require('./rule/login');

class LoginController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  async login() {
    const { ctx, service } = this;
    ctx.validate(rule.login);
    const payload = ctx.request.body;
    const res = await service.user.login.login(payload);
    ctx.helper.success(ctx, res);
  }
}
module.exports = LoginController;
