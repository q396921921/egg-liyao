'use strict';

module.exports = {
  login: {
    phone: { type: 'string', required: true, allowEmpty: false, format: /^[0-9]{11}$/ },
    password: { type: 'password', required: true, allowEmpty: false, min: 6 },
  },
};
