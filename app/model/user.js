'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    phone: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
  }, {
    timestamps: true,
  });
  return mongoose.model('User', UserSchema);
};
