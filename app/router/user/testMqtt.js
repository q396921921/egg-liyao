'use strict';
module.exports = app => {
  app.router.post('/api/v1/testMqtt/post/', app.controller.user.testMqtt.test);
};
