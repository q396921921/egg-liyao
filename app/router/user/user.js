'use strict';
module.exports = app => {
  app.router.resources('user', '/api/v1/user/user', app.controller.user.user);
  app.router.get('/api/v1/user/user/get/gdb', app.controller.user.user.text123);
};
