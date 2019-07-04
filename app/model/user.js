'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Scema({
    username: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
  }, {
    timestamps: true,
  });
  return mongoose.model('User', UserSchema);
};
