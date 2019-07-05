'use strict';
module.exports = app => {
  require('./router/user/user')(app);
  require('./router/user/login')(app);
};
