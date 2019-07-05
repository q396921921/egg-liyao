'use strict';
module.exports = app => {
  app.router.resources('/api/v1/user', app.jwt, app.controller.user.user);
};
