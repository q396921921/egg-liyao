'use strict';
module.exports = app => {
  app.router.resources('/api/v1/user/user', app.controller.user.user);
  app.router.get('api/v1/user/user/text', app.controller.user.user.text);
};
