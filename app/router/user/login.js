'use strict';
module.exports = app => {
  app.router.post('/api/v1/user/login/login', app.controller.user.login.login);
};
